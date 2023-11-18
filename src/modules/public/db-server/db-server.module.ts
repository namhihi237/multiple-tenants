import { Module } from '@nestjs/common';
import { DbServerService } from './db-server.service';
import { DbServerController } from './db-server.controller';
import { DbServer } from './db-server.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [DbServerService],
  controllers: [DbServerController],
  imports: [TypeOrmModule.forFeature([DbServer])],
})
export class DbServerModule {}
