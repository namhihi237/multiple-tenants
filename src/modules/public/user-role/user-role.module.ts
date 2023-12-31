import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './user-role.entity';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';
import { Role } from '../role/role.entity';
import { PermissionModule } from '../permission/permission.module';

@Module({
  providers: [UserRoleService, RoleService],
  exports: [UserRoleService],
  imports: [TypeOrmModule.forFeature([UserRole, Role]), RoleModule, PermissionModule],
})
export class UserRoleModule {}
