import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Tenant } from './tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTenantDto } from './tenant.dto';
import { getTenantConnection } from '../../tenancy/tenancy.utils';
import { IResponse } from '../../../common/utils/response';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { DbServerService } from '../db-server/db-server.service';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
    private readonly userService: UserService,
    private readonly dbsService: DbServerService,
  ) {}

  async create(createTenantDto: CreateTenantDto, currentUser: User): Promise<IResponse<Tenant & { user: User }>> {
    const userExist = await this.userService.findOne('userName', createTenantDto.user.userName);
    if (userExist) {
      throw new BadRequestException('user.userName already exist');
    }

    const dbServer = await this.dbsService.createDb(createTenantDto.dbServer);

    const connectionString = `postgres://${dbServer.user}:${dbServer.password}@${dbServer.host}:${dbServer.port}/${dbServer.dbName}`;

    const newTenant = this.tenantsRepository.create({
      name: createTenantDto.name,
      tenancyName: createTenantDto.tenancyName,
      connectionString,
      tenantDatabaseId: dbServer.id,
    });
    newTenant.creatorUserId = currentUser.id;

    const tenant = await this.tenantsRepository.save(newTenant);
    const userTenant = await this.userService.create({ ...createTenantDto.user, tenantId: tenant.id });
    tenant.user = {
      ...userTenant,
      password: undefined,
      googleAuthenticatorKey: undefined,
      emailConfirmationCode: undefined,
      passwordResetCode: undefined,
      signInToken: undefined,
    };

    const connection = await getTenantConnection(connectionString);
    await connection.runMigrations();
    await connection.close();

    return {
      data: tenant,
    };
  }
}
