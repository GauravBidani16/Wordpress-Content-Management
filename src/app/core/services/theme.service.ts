import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private darkMode = signal(false);
  isDarkMode = this.darkMode.asReadonly();

  constructor() {
    // Check system preference on init
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.setDarkMode(prefersDark);
  }

  toggle(): void {
    this.setDarkMode(!this.darkMode());
  }

  private setDarkMode(dark: boolean): void {
    this.darkMode.set(dark);
    document.body.classList.toggle('dark-theme', dark);
  }
}