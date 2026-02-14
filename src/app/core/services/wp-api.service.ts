import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { WpPost, WpCategory, WpMedia, WpPostPayload } from '../models/wp.models';

@Injectable({ providedIn: 'root' })
export class WpApiService {
  private api = environment.wpApiBase;

  constructor(private http: HttpClient) {}

  // Verify credentials by fetching current user
  testConnection(): Observable<any> {
    return this.http.get(`${this.api}/users/me`);
  }

  getPosts(perPage = 20): Observable<WpPost[]> {
    return this.http.get<WpPost[]>(`${this.api}/posts`, {
      params: { per_page: perPage, orderby: 'date' }
    });
  }

  createPost(payload: WpPostPayload): Observable<WpPost> {
    return this.http.post<WpPost>(`${this.api}/posts`, payload);
  }

  getCategories(): Observable<WpCategory[]> {
    return this.http.get<WpCategory[]>(`${this.api}/categories`, {
      params: { per_page: 100 }
    });
  }

  getMedia(perPage = 50): Observable<WpMedia[]> {
    return this.http.get<WpMedia[]>(`${this.api}/media`, {
      params: { per_page: perPage, orderby: 'date', media_type: 'image' }
    });
  }

  uploadMedia(file: File): Observable<WpMedia> {
    const formData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<WpMedia>(`${this.api}/media`, formData);
  }
}