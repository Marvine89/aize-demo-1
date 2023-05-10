/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { AuthUsers, User } from '../models';
import { of } from 'rxjs';

export class UserStoreServiceMock {
  user$ = of({});
  username$ = of('fake-user-name');

  set authUser(user: AuthUsers) {}

  get user() {
    return {};
  }

  get userId() {
    return 'fake-user-id';
  }

  updateUser(user: User) {}

  updateUsername(username: string) {}
}
