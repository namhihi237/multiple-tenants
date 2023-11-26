import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { Permission } from './permission.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [PermissionService],
  imports: [TypeOrmModule.forFeature([Permission])],
  exports: [PermissionService],
})
export class PermissionModule {}
