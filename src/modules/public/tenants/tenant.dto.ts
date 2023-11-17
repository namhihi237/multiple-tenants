import { IsNotEmpty } from 'class-validator';

export class CreateTenantDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  tenancyName: string;
}
