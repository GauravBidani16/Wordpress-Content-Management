import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QuillModule } from 'ngx-quill';
import { WpApiService } from '../../../core/services/wp-api.service';
import { NotificationService } from '../../../core/services/notification.service';
import { WpCategory, WpMedia, WpPostPayload } from '../../../core/models/wp.models';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule,
    QuillModule
  ],
  templateUrl: './create-post.html',
  styleUrl: './create-post.scss'
})
export class CreatePost implements OnInit {
  title = '';
  content = '';
  status: 'draft' | 'publish' = 'draft';
  selectedCategories: number[] = [];
  selectedMediaId: number | null = null;

  categories: WpCategory[] = [];
  mediaLibrary: WpMedia[] = [];

  // Hardcoded for POC -- will come from SharePoint list later
  frequentMediaIds: number[] = [];
  frequentMedia: WpMedia[] = [];

  submitting = false;
  uploading = false;
  statusMessage = '';
  statusSuccess = false;

  quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ header: [1, 2, 3, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['blockquote', 'link', 'image'],
      ['clean']
    ]
  };

  constructor(
    private wpApi: WpApiService,
    private notification: NotificationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadMedia();
  }

  loadCategories(): void {
    this.wpApi.getCategories().subscribe({
      next: (cats) => {
        this.categories = cats;
        this.cdr.markForCheck();
      }
    });
  }

  loadMedia(): void {
    this.wpApi.getMedia().subscribe({
      next: (media) => {
        this.mediaLibrary = media;
        this.frequentMedia = media.filter(m => this.frequentMediaIds.includes(m.id));
        this.cdr.markForCheck();
      }
    });
  }

  selectMedia(mediaId: number): void {
    this.selectedMediaId = this.selectedMediaId === mediaId ? null : mediaId;
  }

  uploadImage(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    this.uploading = true;
    const file = input.files[0];

    this.wpApi.uploadMedia(file).subscribe({
      next: (media) => {
        this.mediaLibrary.unshift(media);
        this.selectedMediaId = media.id;
        this.uploading = false;
        this.notification.success('Image uploaded successfully.');
        this.cdr.markForCheck();
      },
      error: () => {
        this.uploading = false;
        this.cdr.markForCheck();
      }
    });
  }

  submit(): void {
    if (!this.title.trim()) {
      this.notification.error('Title is required.');
      return;
    }

    this.submitting = true;
    this.statusMessage = '';

    const payload: WpPostPayload = {
      title: this.title,
      content: this.content,
      status: this.status,
      categories: this.selectedCategories.length ? this.selectedCategories : undefined,
      featured_media: this.selectedMediaId ?? undefined
    };

    this.wpApi.createPost(payload).subscribe({
      next: (post) => {
        this.submitting = false;
        this.statusSuccess = true;
        this.statusMessage = `Post created successfully (ID: ${post.id})`;
        this.notification.success(
          this.status === 'publish' ? 'Post published successfully.' : 'Draft saved successfully.'
        );
        this.resetForm();
        this.cdr.markForCheck();
      },
      error: () => {
        this.submitting = false;
        this.cdr.markForCheck();
      }
    });
  }

  resetForm(): void {
    this.title = '';
    this.content = '';
    this.status = 'draft';
    this.selectedCategories = [];
    this.selectedMediaId = null;
  }
}