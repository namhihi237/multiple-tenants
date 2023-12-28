import { BadRequestException, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tenant } from './tenant.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTenantDto } from './tenant.dto';
import { getTenantConnection } from '../../tenancy/tenancy.utils';
import { IResponse } from '../../../common/utils/response';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { DbServerService } from '../db-server/db-server.service';
import { RoleEnum } from '../../../enums/role.enum';
import { seederRoles } from '../../../seeder/permission.seeder';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
    private readonly userService: UserService,
    private readonly dbsService: DbServerService,
  ) {}

  async create(createTenantDto: CreateTenantDto): Promise<IResponse<Tenant & { user: User }>> {
    const { dedicated, serverName } = createTenantDto;
    let connectionCreation: DataSource = null;
    if (!dedicated && serverName) {
      const dbServerNeedToSave = await this.dbsService.findServerByName(serverName);
      connectionCreation = dbServerNeedToSave
        ? await getTenantConnection(this.dbsService.getConnectionString(dbServerNeedToSave))
        : null;
    }

    const userExist = await this.userService.findOne('userName', createTenantDto.user.userName, connectionCreation);
    if (userExist) {
      throw new BadRequestException('user.userName already exist');
    }

    const tenantsRepository = connectionCreation ? connectionCreation.getRepository(Tenant) : this.tenantsRepository;

    const dbServer = await this.dbsService.createDb(createTenantDto.dbServer);

    const connectionString = this.dbsService.getConnectionString(dbServer);

    const dbExist = await tenantsRepository.findOne({ where: { connectionString } });
    if (dbExist) {
      throw new BadRequestException('user.dbServer already exist');
    }

    const connection = await getTenantConnection(connectionString);
    await connection.runMigrations();
    await seederRoles(connection);
    await connection.close();

    const newTenant = tenantsRepository.create({
      name: createTenantDto.name,
      tenancyName: createTenantDto.tenancyName,
      connectionString,
      tenantDatabaseId: dbServer.id,
    });

    // newTenant.creatorUserId = currentUser.id;

    const tenant = await tenantsRepository.save(newTenant);

    const newMainTenant = this.tenantsRepository.create({
      name: createTenantDto.name,
      tenancyName: createTenantDto.tenancyName,
      connectionString,
      tenantDatabaseId: dbServer.id,
    });
    await this.tenantsRepository.save(newMainTenant);

    const userTenant = await this.userService.create(
      { ...createTenantDto.user, tenantId: tenant.id },
      RoleEnum.Tenant,
      connectionCreation,
    );

    if (connectionCreation) {
      await connectionCreation.close();
    }

    tenant.user = {
      ...userTenant,
      password: undefined,
      googleAuthenticatorKey: undefined,
      emailConfirmationCode: undefined,
      passwordResetCode: undefined,
      signInToken: undefined,
    };

    return {
      data: tenant,
    };
  }
}
