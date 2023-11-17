import { IsNotEmpty } from 'class-validator';

export class InputSignInDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;
}

export interface SignInResponse {
  success: boolean;
  userInfo: any;
  token: string;
}
