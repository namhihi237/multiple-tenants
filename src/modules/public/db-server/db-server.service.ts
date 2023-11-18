import { Injectable } from '@nestjs/common';
import { DbServer } from './db-server.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDbDto } from './db-server.dto';

@Injectable()
export class DbServerService {
  constructor(
    @InjectRepository(DbServer)
    private readonly dbsRepository: Repository<DbServer>,
  ) {}
  async createDb(createDbDto: CreateDbDto) {
    const db = this.dbsRepository.create(createDbDto);
    return this.dbsRepository.save(db);
  }
}
