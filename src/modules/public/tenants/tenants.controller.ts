import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './tenant.dto';
import { IResponse } from '../../../common/utils/response';
import { Tenant } from './tenant.entity';
import { AuthGuard } from '../../../guards/auth.guard';
import { User } from '../user/user.entity';
import { Roles } from '../../../common/decorator/roles.decorator';
import { RoleEnum } from '../../../enums/role.enum';
import { RolesGuard } from '../../../guards/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('/api/tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  @Roles(RoleEnum.Host)
  async create(@Body() createTenantDto: CreateTenantDto): Promise<IResponse<Tenant & { user: User }>> {
    return this.tenantsService.create(createTenantDto);
  }
}
