import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserCreateDto {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  surname: string;

  @IsNotEmpty()
  normalizeUserName: string;

  @IsNotEmpty()
  normalizeEmail: string;
}
