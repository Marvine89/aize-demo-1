import { Body, Controller, Get, Post } from '@nestjs/common';
import { BeAuthLibService } from './be-auth-lib.service';
import { UserNameDto, LoginDto, SignUpDto } from '@share-libs/models';

@Controller()
export class BeAuthLibController {
  constructor(private readonly _authService: BeAuthLibService) {}

  @Post('/validate-username')
  validateUser(@Body() usernameDto: UserNameDto) {
    return this._authService.validateUser(usernameDto);
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    return this._authService.login(loginDto);
  }

  @Post('/signup')
  signup(@Body() signupDto: SignUpDto) {
    return this._authService.signup(signupDto);
  }

  @Get('/refresh-token')
  getrefreshToken() {
    return { value: true };
  }
}
