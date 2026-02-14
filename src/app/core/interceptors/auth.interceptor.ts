import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);

  // Only attach auth to WordPress API requests
  if (!req.url.startsWith(environment.wpApiBase)) {
    return next(req);
  }

  const authHeader = auth.getAuthHeader();
  if (!authHeader) {
    return next(req);
  }

  const cloned = req.clone({
    setHeaders: { Authorization: authHeader }
  });

  return next(cloned);
};