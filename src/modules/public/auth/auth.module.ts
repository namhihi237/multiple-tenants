import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserRoleModule } from '../user-role/user-role.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => UserModule), JwtModule, UserRoleModule],
  controllers: [AuthController],
  exports: [AuthService],
  providers: [AuthService, UserService],
})
export class AuthModule {}
