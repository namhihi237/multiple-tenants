import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './tenant.entity';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { User } from '../user/user.entity';
import { DbServerService } from '../db-server/db-server.service';
import { DbServerModule } from '../db-server/db-server.module';
import { DbServer } from '../db-server/db-server.entity';
import { UserRoleModule } from '../user-role/user-role.module';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tenant, User, DbServer]),
    AuthModule,
    UserModule,
    DbServerModule,
    UserRoleModule,
    PermissionModule,
  ],
  providers: [TenantsService, UserService, DbServerService],
  controllers: [TenantsController],
})
export class TenantsModule {}
