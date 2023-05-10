import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { environment } from '@be-environment-lib';
import { BeStoreLibService } from '@be-store-lib';


@Injectable()
export class BeAuthLibGuard implements CanActivate {
  constructor(private _jwtService: JwtService, private _userStore: BeStoreLibService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const authorization = request.headers['authorization'] || '';
      const token = authorization.replace('Bearer', '').trim();
      const userId = await this._jwtService.verifyAsync(token, { secret: environment.secret });

      const userExist = this._userStore.onlineUsers.some(({ id }) => id === userId);
      if (!userExist) return false;

      request.session = { ...request.session, userId };
      return true;
    } catch (error) {
      return false;
    }
  }
}

@Injectable()
export class BeSocketAuthLibGuard implements CanActivate {
  constructor(private _jwtService: JwtService, private _userStore: BeStoreLibService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const socketId = request.id;
      const token = request.handshake.headers.authorization;
      const userId = await this._jwtService.verifyAsync(token, { secret: environment.secret });
      const user = this._userStore.onlineUsers.find(({ id }) => id === userId);
      if (!user) return false;
      request.session = { ...request.session, userId, socketId, username: user?.username };
      return true;
    } catch (error) {
      return false;
    }
  }
}
