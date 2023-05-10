import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map } from 'rxjs';
import { AuthUsers, User } from '../models';

@Injectable({ providedIn: 'root' })
export class UserStoreService {
  private _user!: AuthUsers;

  private _user$ = new BehaviorSubject<UNDEFINED<AuthUsers>>(undefined);
  user$ = this._user$.asObservable().pipe(filter(Boolean));
  username$ = this.user$.pipe(map(user => user.username));

  set authUser(user: AuthUsers) {
    this._user = user;
    this._user$.next(user);
  }

  get user() {
    return this._user;
  }

  get userId() {
    return this._user?.userId;
  }

  updateUser(user: User) {
    this._user = { ...this._user, username: user.username, userId: user.id };
    this._user$.next(this._user);
  }

  updateUsername(username: string) {
    this._user = { ...this._user, username: username };
    this._user$.next(this._user);
  }
}
