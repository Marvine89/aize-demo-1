import { of } from 'rxjs';

export class TokenServiceMock {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setToken(_: { token: string; expireIn: number }) {
    //
  }

  get token() {
    return 'fake-token';
  }

  private get _expireTime() {
    return '';
  }

  get token$() {
    return of('');
  }

  clearToken() {
    //
  }
}
