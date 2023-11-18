import { IsNotEmpty, ValidateNested } from 'class-validator';
import { UserCreateDto } from '../user/user.dto';
import { Type } from 'class-transformer';
import { CreateDbDto } from '../db-server/db-server.dto';

export class CreateTenantDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  tenancyName: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => UserCreateDto)
  user: UserCreateDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateDbDto)
  dbServer: CreateDbDto;
}
