import { IsNotEmpty } from 'class-validator';
import { User } from '../user/user.entity';

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
