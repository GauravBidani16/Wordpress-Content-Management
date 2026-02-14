import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AuthService } from '../../core/services/auth.service';
import { WpApiService } from '../../core/services/wp-api.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './settings.html',
  styleUrl: './settings.scss'
})
export class Settings {
  username = '';
  appPassword = '';
  testing = false;
  statusMessage = '';
  statusSuccess = false;

  constructor(
    private auth: AuthService,
    private wpApi: WpApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  testConnection(): void {
    if (!this.username || !this.appPassword) {
      this.statusMessage = 'Please enter both username and application password.';
      this.statusSuccess = false;
      return;
    }

    this.testing = true;
    this.statusMessage = '';

    // Set credentials so the interceptor can use them
    this.auth.setCredentials(this.username, this.appPassword);

    this.wpApi.testConnection().subscribe({
      next: (user) => {
        this.testing = false;
        this.statusSuccess = true;
        this.statusMessage = `Connected as ${user.name} (${user.roles?.join(', ')})`;
        this.cdr.markForCheck();
      },
      error: () => {
        this.testing = false;
        this.statusSuccess = false;
        this.statusMessage = 'Connection failed. Check your credentials.';
        this.auth.clearCredentials();
        this.cdr.markForCheck();
      }
    });
  }

  proceed(): void {
    this.router.navigate(['/posts/create']);
  }
}