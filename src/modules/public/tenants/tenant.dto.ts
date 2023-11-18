import { IsNotEmpty, ValidateNested } from 'class-validator';
import { UserCreateDto } from '../user/user.dto';
import { Type } from 'class-transformer';

export class CreateTenantDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  tenancyName: string;

  @ValidateNested()
  @Type(() => UserCreateDto)
  user: UserCreateDto;
}
