import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  private requestCount = 0;
  private loading = signal(false);
  isLoading = this.loading.asReadonly();

  // Tracks concurrent requests so the loader stays visible until all complete
  show(): void {
    this.requestCount++;
    this.loading.set(true);
  }

  hide(): void {
    this.requestCount--;
    if (this.requestCount <= 0) {
      this.requestCount = 0;
      this.loading.set(false);
    }
  }
}