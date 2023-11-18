import { Controller, Post, Body } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { CreateTenantDto } from './tenant.dto';
import { IResponse } from '../../../common/utils/response';
import { Tenant } from './tenant.entity';

@Controller('/api/tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  async create(@Body() createTenantDto: CreateTenantDto): Promise<IResponse<Tenant>> {
    return this.tenantsService.create(createTenantDto);
  }
}
