import { Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRole } from './user-role.entity';
import { RoleModule } from '../role/role.module';
import { RoleService } from '../role/role.service';
import { Role } from '../user/entity/role.entity';

@Module({
  providers: [UserRoleService, RoleService],
  exports: [UserRoleService],
  imports: [TypeOrmModule.forFeature([UserRole, Role]), RoleModule],
})
export class UserRoleModule {}
