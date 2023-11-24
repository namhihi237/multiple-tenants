import { IsNotEmpty } from 'class-validator';
import { User } from '../role/user.entity';

export class InputSignInDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;
}

export class SignInResponse {
  userInfo: User;

  token: string;
}
