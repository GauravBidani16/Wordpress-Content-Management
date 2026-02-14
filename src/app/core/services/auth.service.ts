import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private credentials: { username: string; appPassword: string } | null = null;

  setCredentials(username: string, appPassword: string): void {
    this.credentials = { username, appPassword };
  }

  getAuthHeader(): string | null {
    if (!this.credentials) return null;
    return 'Basic ' + btoa(`${this.credentials.username}:${this.credentials.appPassword}`);
  }

  isAuthenticated(): boolean {
    return this.credentials !== null;
  }

  clearCredentials(): void {
    this.credentials = null;
  }
}