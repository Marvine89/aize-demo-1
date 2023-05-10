import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { environment } from '@be-environment-lib';
import { AuthUsers, UserNameDto, LoginDto, SignUpDto } from '@share-libs/models';
import { ERROR } from '@share-libs/enums';
import { BeStoreLibService } from '@be-store-lib';

@Injectable()
export class BeAuthLibService {
  private readonly _secret = environment.secret;
  private readonly _exipireIn = environment.tokenExipireIn;

  constructor(private _userStore: BeStoreLibService, private _jwtService: JwtService) {}

  validateUser(userNameDto: UserNameDto) {
    return this._userStore.validateUsername(userNameDto.username);
  }

  async login(userNameDto: LoginDto): Promise<AuthUsers> {
    const user = this._userStore.findUser(userNameDto.username);

    if (!user) throw new BadRequestException(ERROR.INVALID_USERNAME);

    const verifyEncryption = await this.verifyEncryption(userNameDto.password, user.password);
    if (!verifyEncryption) throw new BadRequestException(ERROR.INVALID_USERNAME_PASSWORD);

    return {
      userId: user.id,
      username: user.username,
      token: await this._createToken(user.id),
      expireIn: this._exipireIn
    };
  }

  async signup(userNameDto: SignUpDto): Promise<{ result: boolean }> {
    const { userExist } = this._userStore.validateUsername(userNameDto.username);

    if (userExist) throw new BadRequestException(ERROR.INVALID_USERNAME);

    if (userNameDto.password !== userNameDto.confirmPassword || userNameDto.password.length < 6)
      throw new BadRequestException(ERROR.INVALID_PASSWORD_RULE);

    const encryptedPassword = await this.createEncryption(userNameDto.password);

    const result = this._userStore.addNewUser(userNameDto.username, encryptedPassword);
    if (result.error) throw new BadRequestException(result.error);

    return { result: true };
  }

  private _createToken(id: string) {
    return this._jwtService.signAsync(id, { secret: this._secret });
  }

  private async verifyEncryption(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }

  private async createEncryption(password: string) {
    return await bcrypt.hash(password, 10);
  }
}
