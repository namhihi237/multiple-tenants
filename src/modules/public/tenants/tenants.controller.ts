import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './tenant.dto';
import { IResponse } from '../../../common/utils/response';
import { Tenant } from './tenant.entity';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../user/user.entity';
import { CurrentUser } from '../../../common/decorator/currentUser.decorator';

@UseGuards(AuthGuard)
@Controller('/api/tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  async create(
    @CurrentUser() user: User,
    @Body() createTenantDto: CreateTenantDto,
  ): Promise<IResponse<Tenant & { user: User }>> {
    return this.tenantsService.create(createTenantDto, user);
  }
}
