// auth.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Lógica a ejecutar en caso de error 401
          console.error('¡Error 401! No autorizado');
          localStorage.clear();
          localStorage.removeItem('userData');
          localStorage.removeItem('login');
          window.location.href = window.location.href;
        }
        return throwError(error);
      })
    );
  }
}
