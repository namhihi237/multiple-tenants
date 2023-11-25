import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [RoleService],
  exports: [RoleService],
  imports: [TypeOrmModule.forFeature([Role])],
})
export class RoleModule {}
