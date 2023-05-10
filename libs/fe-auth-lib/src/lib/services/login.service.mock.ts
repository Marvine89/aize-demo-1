/* eslint-disable @typescript-eslint/no-unused-vars */
import { computed, signal } from '@angular/core';
import { of } from 'rxjs';
import { ValidateUserResponse } from '../models/validate-user.model';
import { AuthUsers } from '@share-lib';

export class AuthServiceMock {
  private readonly _usernameExist = signal<boolean>(true);
  readonly usernameExist = computed(() => this._usernameExist());
  readonly usernameDoesNotExist = computed(() => !this._usernameExist());

  readonly hasError$ = of(undefined);
  readonly isValidateUserLoading$ = of(false);

  readonly isLoginLoading$ = of(false);

  checkUserName = (type: 'login' | 'signup') =>
    type === 'signup' ? !this._usernameExist() : this._usernameExist();

  validateUsername(_: string) {
    return of(<ValidateUserResponse>{});
  }

  login(username: string, password: string) {
    return of(<AuthUsers>{});
  }

  signup(username: string, password: string, confirmPassword: string) {
    return of({ result: true });
  }

  get combineLoadingEvents$() {
    return of(false);
  }
}
