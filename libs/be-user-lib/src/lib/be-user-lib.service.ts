import { Injectable } from '@nestjs/common';
import { User } from '@share-libs/models';
import { BeStoreLibService } from '@be-store-lib';

@Injectable()
export class BeUserLibService {
  constructor(private _userStore: BeStoreLibService) {}

  findUser(userId: string): User {
    const user = this._userStore.onlineUsers.find(({ id }) => id === userId);
    return user;
    
  }
}
