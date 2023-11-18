import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
})
export class UserModule {}
