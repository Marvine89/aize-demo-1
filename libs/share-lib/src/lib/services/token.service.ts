import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EnvironmentToken } from '@fe-environment';
import { map, of, tap } from 'rxjs';
import { StorageEnum } from '../shared.enum';

@Injectable({ providedIn: 'root' })
export class TokenService {
  private readonly _apiUrl = inject(EnvironmentToken).apiUrl;
  private readonly _authUrl = `${this._apiUrl}/auth`;
  private readonly _http = inject(HttpClient);

  setToken({ token, expireIn }: { token: string; expireIn: number }) {
    const dateTime = new Date();
    const expireTime = dateTime.setSeconds(dateTime.getSeconds() + expireIn).toString();

    localStorage.setItem(StorageEnum.USER_TOKEN, token);
    localStorage.setItem(StorageEnum.USER_TOKEN_EXPIRE_TIME, expireTime);
  }

  get token() {
    return localStorage.getItem(StorageEnum.USER_TOKEN);
  }

  private get _expireTime() {
    return localStorage.getItem(StorageEnum.USER_TOKEN_EXPIRE_TIME);
  }

  get token$() {
    const isTokenExpired = Number(this._expireTime) < new Date().getTime();
    return !isTokenExpired || !this.token ? of(this.token) : of(this.token); // this._referechToken$;
  }

  clearToken() {
    localStorage.removeItem(StorageEnum.USER_TOKEN);
  }

  private get _referechToken$() {
    return this._http
      .get<{ token: string; expireIn: number }>(`${this._authUrl}/refresh-token`)
      .pipe(tap(this.setToken.bind(this)))
      .pipe(map(({ token }) => token));
  }
}
