import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsController } from './tenants.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tenant } from './tenant.entity';
import { AuthModule } from '../auth/auth.module';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant, User]), AuthModule, UserModule],
  providers: [TenantsService, UserService],
  controllers: [TenantsController],
})
export class TenantsModule {}
