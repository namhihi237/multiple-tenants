import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTenantDto } from './tenant.dto';
import { getTenantConnection } from '../../tenancy/tenancy.utils';
import { connectionSource } from '../../../orm.config';
import { IResponse } from '../../../common/utils/response';
import { User } from '../user/user.entity';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
  ) {}

  async create(createTenantDto: CreateTenantDto, currentUser: User): Promise<IResponse<Tenant>> {
    const newTenant = this.tenantsRepository.create(createTenantDto);
    newTenant.creatorUserId = currentUser.id;
    const tenant = await this.tenantsRepository.save(newTenant);

    const schemaName = `tenant_${tenant.id}`;
    await connectionSource.query(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);

    const connection = await getTenantConnection(`${tenant.id}`);
    await connection.runMigrations();
    await connection.close();

    return {
      data: tenant,
    };
  }
}
