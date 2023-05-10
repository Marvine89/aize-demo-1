import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ERROR } from '@share-libs/enums';
import { UserDto } from '@share-libs/models';



@Injectable()
export class BeStoreLibService {
  private _users: UserDto[] = [];

  validateUsername(p_username: string) {
    const userExist = this._users.some(({ username }) => username.toLowerCase() === p_username.toLowerCase());
    return { userExist };
  }

  findUser(p_username: string) {
    return this._users.find(({ username }) => username.toLowerCase() === p_username.toLowerCase());
  }

  addNewUser(username: string, encryptedPassword: string) {
    const { userExist } = this.validateUsername(username);
    if (userExist) return { error: ERROR.INVALID_USERNAME };

    const id = randomUUID();
    const user = <UserDto>{ id, username, password: encryptedPassword };
    this._users.push(user);

    return { id, username };
  }

  get onlineUsers() {
    return this._users;
  }
}
