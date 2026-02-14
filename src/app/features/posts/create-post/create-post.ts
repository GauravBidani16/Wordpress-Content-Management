import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { QuillModule } from 'ngx-quill';
import { WpApiService } from '../../../core/services/wp-api.service';
import { WpCategory, WpMedia, WpPostPayload } from '../../../core/models/wp.models';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressBarModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
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

  // Hardcoded for POC, will come from SharePoint list later
  frequentMediaIds: number[] = [/* add your most used media IDs here */];
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
        // Filter frequent media from the full library
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
        this.cdr.markForCheck();
      },
      error: () => {
        this.uploading = false;
        this.statusMessage = 'Failed to upload image.';
        this.statusSuccess = false;
        this.cdr.markForCheck();
      }
    });
  }

  submit(): void {
    if (!this.title.trim()) {
      this.statusMessage = 'Title is required.';
      this.statusSuccess = false;
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
        this.resetForm();
        this.cdr.markForCheck();
      },
      error: () => {
        this.submitting = false;
        this.statusSuccess = false;
        this.statusMessage = 'Failed to create post. Please try again.';
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