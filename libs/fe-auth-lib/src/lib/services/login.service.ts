import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { EnvironmentToken } from '@fe-environment';
import { AuthUsers, UserStoreService, TokenService } from '@share-lib';
import { BehaviorSubject, catchError, combineLatest, delay, map, tap, throwError } from 'rxjs';
import { ValidateUserResponse } from '../models/validate-user.model';

@Injectable()
export class AuthService {
  private readonly _http = inject(HttpClient);
  private readonly _tokenService = inject(TokenService);
  private readonly _userStore = inject(UserStoreService);
  private readonly _environment = inject(EnvironmentToken);
  private readonly _authUrl = `${this._environment.apiUrl}/auth`;

  private readonly _usernameExist = signal<boolean>(true);
  readonly usernameExist = computed(() => this._usernameExist());
  readonly usernameDoesNotExist = computed(() => !this._usernameExist());

  private _hasError$ = new BehaviorSubject<UNDEFINED<string>>(undefined);
  readonly hasError$ = this._hasError$.asObservable();

  private _isValidateUserLoading$ = new BehaviorSubject<boolean>(false);
  readonly isValidateUserLoading$ = this._isValidateUserLoading$.asObservable();

  private _isLoginLoading$ = new BehaviorSubject<boolean>(false);
  readonly isLoginLoading$ = this._isLoginLoading$.asObservable();

  checkUserName = (type: 'login' | 'signup') =>
    type === 'signup' ? !this._usernameExist() : this._usernameExist();

  validateUsername(username: string) {
    this._isValidateUserLoading$.next(true);

    return this._http
      .post<ValidateUserResponse>(`${this._authUrl}/validate-username`, { username })
      .pipe(delay(500))
      .pipe(tap(({ userExist }) => this._usernameExist.set(userExist)))
      .pipe(tap(() => this._hasError$.next(undefined)))
      .pipe(tap(() => this._isValidateUserLoading$.next(false)))
      .pipe(catchError(this._handleError.bind(this)));
  }

  login(username: string, password: string) {
    this._isLoginLoading$.next(true);

    return this._http
      .post<AuthUsers>(`${this._authUrl}/login`, { username, password })
      .pipe(delay(500))
      .pipe(tap(user => (this._userStore.authUser = user)))
      .pipe(tap(({ token, expireIn }) => this._tokenService.setToken({ token, expireIn })))
      .pipe(tap(() => this._hasError$.next(undefined)))
      .pipe(tap(() => this._isLoginLoading$.next(false)))
      .pipe(map(({ username, token }) => !!username && !!token))
      .pipe(catchError(this._handleError.bind(this)));
  }

  signup(username: string, password: string, confirmPassword: string) {
    this._isLoginLoading$.next(true);

    return this._http
      .post<{ result: boolean }>(`${this._authUrl}/signup`, { username, password, confirmPassword })
      .pipe(tap(() => this._isLoginLoading$.next(false)))
      .pipe(map(({ result }) => result))
      .pipe(catchError(this._handleError.bind(this)));
  }

  private _handleError(errorObj: HttpErrorResponse) {
    const errorMsg = errorObj.status === 400 ? errorObj.error?.message : 'API_ERROR';
    this._hasError$.next(errorMsg);
    this._isLoginLoading$.next(false);
    this._isValidateUserLoading$.next(false);
    return throwError(() => errorObj);
  }

  get combineLoadingEvents$() {
    return combineLatest([this.isValidateUserLoading$, this.isLoginLoading$]).pipe(
      map(([usernameLoading, isLoginLoading]) => {
        return usernameLoading || isLoginLoading;
      })
    );
  }
}
