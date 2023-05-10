import {
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { TokenService } from '../services';

export const HIDE_ERROR_FEEDBACK = new HttpContextToken<boolean>(() => false);

@Injectable({ providedIn: 'root' })
export class HttpTokenInterceptor implements HttpInterceptor {
  private readonly _tokenService = inject(TokenService);
  private readonly _router = inject(Router);

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.includes('assets/i18n')) return next.handle(request);

    return this._tokenService.token$.pipe(
      map(token => token && request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`) })),
      map(clonedRequest => clonedRequest || request),
      mergeMap(clonedRequest => next.handle(clonedRequest)),
      catchError(this._handleError.bind(this))
    );
  }

  private _handleError(errorObj: HttpErrorResponse) {
    if (errorObj.status === 401) {
      errorObj.status === 401 && this._router.navigate(['/']);
    }

    return throwError(() => errorObj);
  }
}
