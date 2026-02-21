import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notification = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'An unexpected error occurred.';

      switch (error.status) {
        case 0:
          message = 'Unable to connect. Check your network or CORS settings.';
          break;
        case 401:
          message = 'Authentication failed. Check your credentials.';
          break;
        case 403:
          message = 'You do not have permission to perform this action.';
          break;
        case 404:
          message = 'The requested resource was not found.';
          break;
        case 500:
          message = 'WordPress server error. Please try again later.';
          break;
        default:
          if (error.error?.message) {
            message = error.error.message;
          }
      }

      notification.error(message);
      return throwError(() => error);
    })
  );
};