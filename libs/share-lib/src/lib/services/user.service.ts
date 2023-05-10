import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EnvironmentToken } from '@fe-environment';
import { BehaviorSubject, catchError, delay, tap, throwError } from 'rxjs';
import { User } from '../models';
import { UserStoreService } from './user-store.service';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly _http = inject(HttpClient);
  private readonly _userStore = inject(UserStoreService);
  private readonly _environment = inject(EnvironmentToken);

  private readonly _apiUrl = this._environment.apiUrl;
  private readonly _userUrl = `${this._apiUrl}/users`;

  private _isFetchingDetails$ = new BehaviorSubject<boolean>(false);
  isFetchingDetails$ = this._isFetchingDetails$.asObservable();

  private _hasError$ = new BehaviorSubject<boolean>(false);
  hasError$ = this._hasError$.asObservable();

  getMyDetails() {
    this._isFetchingDetails$.next(true);

    return this._http
      .get<User>(`${this._userUrl}/me`)
      .pipe(delay(400))
      .pipe(tap(user => this._userStore.updateUser(user)))
      .pipe(tap(() => this._hasError$.next(false)))
      .pipe(tap(() => this._isFetchingDetails$.next(false)))
      .pipe(catchError(this._handleError.bind(this)));
  }

  private _handleError(error: HttpErrorResponse) {
    this._hasError$.next(true);
    this._isFetchingDetails$.next(false);
    return throwError(() => error);
  }
}
