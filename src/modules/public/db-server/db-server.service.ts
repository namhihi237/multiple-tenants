import { Injectable } from '@nestjs/common';
import { DbServer } from './db-server.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDbDto } from './db-server.dto';
import * as pgPromise from 'pg-promise';

@Injectable()
export class DbServerService {
  private db: any;
  constructor(
    @InjectRepository(DbServer)
    private readonly dbsRepository: Repository<DbServer>,
  ) {
    this.db = pgPromise();
  }

  async createDb(createDbDto: CreateDbDto) {
    const db = this.dbsRepository.create(createDbDto);
    await this.createDatabaseWithRemoteHost(createDbDto);
    return this.dbsRepository.save(db);
  }

  async findServerByName(name?: string) {
    return this.dbsRepository.findOne({
      where: {
        name,
      },
    });
  }

  getConnectionString(dbServer: DbServer): string {
    return `postgres://${dbServer.user}:${dbServer.password}@${dbServer.host}:${dbServer.port}/${dbServer.dbName}`;
  }

  async createDatabaseWithRemoteHost(serverInfo: CreateDbDto): Promise<void> {
    const { host, port, password, user, dbName } = serverInfo;
    // Connect to the remote database server
    const connectionDetails = {
      host,
      port,
      user,
      password,
      database: 'postgres', // You can use 'postgres' or 'template1' as the default database
    };

    const remoteDb = this.db(connectionDetails);

    try {
      // Create a new database
      await remoteDb.none(`CREATE DATABASE $1:raw`, [dbName]);

      // Optionally, you might want to create users, set permissions, etc.

      // Close the connection to the remote database
      await remoteDb.$pool.end();
      console.log('Created DB succuss:', dbName);
    } catch (error) {
      // Handle errors (e.g., database already exists, permission issues)
      console.error('Error creating database:', error.message);
      throw error;
    }
  }
}
