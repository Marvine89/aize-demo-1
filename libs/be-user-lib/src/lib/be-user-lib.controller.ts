import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { BeAuthLibGuard } from '@be-auth-lib';
import { BeUserLibService } from './be-user-lib.service';
import { User } from '@share-libs/models';

@Controller()
export class BeUserController {
  constructor(private readonly _userService: BeUserLibService) {}

  @Get('/me')
  @UseGuards(BeAuthLibGuard)
  getMyDetails(@Session() { userId }: { userId: string }): Omit<User, 'password'> {
    return this._userService.findUser(userId);
  }
}
