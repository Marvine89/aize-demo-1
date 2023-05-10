export class User {
  id!: string;
  username!: string;
}

export class AuthUsers {
  userId!: string;
  username!: string;
  token!: string;
  expireIn!: number;
}

export class SignUpDto {
  username!: string;
  password!: string;
  confirmPassword!: string;
}

export class UserDto {
  id!: string;
  username!: string;
  password!: string;
}

export type LoginDto = Omit<SignUpDto, 'confirmPassword'>;

export type UserNameDto = Pick<LoginDto, 'username'>;
