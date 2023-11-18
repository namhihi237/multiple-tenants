import { IsNotEmpty } from 'class-validator';

export class CreateDbDto {
  @IsNotEmpty()
  host: string;

  @IsNotEmpty()
  port: number;

  @IsNotEmpty()
  user: string;

  password: string;
  @IsNotEmpty()
  dbName: string;

  name: string;
}
