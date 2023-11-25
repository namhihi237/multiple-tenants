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

@Module({
  providers: [UserService, UserRoleService],
  controllers: [UserController],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([UserRole, User]), forwardRef(() => AuthModule), UserRoleModule, RoleModule],
})
export class UserModule {}
