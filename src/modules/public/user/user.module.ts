import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { UserRole } from '../user-role/user-role.entity';
import { UserRoleService } from '../user-role/user-role.service';
import { UserRoleModule } from '../user-role/user-role.module';
import { RoleModule } from '../role/role.module';
import { PermissionService } from '../permission/permission.service';
import { PermissionModule } from '../permission/permission.module';
import { Permission } from '../permission/permission.entity';

@Module({
  providers: [UserService, UserRoleService, PermissionService],
  controllers: [UserController],
  exports: [UserService],
  imports: [
    TypeOrmModule.forFeature([Permission, UserRole, User]),
    forwardRef(() => AuthModule),
    UserRoleModule,
    RoleModule,
    PermissionModule,
  ],
})
export class UserModule {}
