import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectionSource } from './orm.config';
import { getTenantConnection } from './modules/tenancy/tenancy.utils';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptor/response.interceptor';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { tenancyMiddleware } from './modules/tenancy/tenancy.middleware';
import { seederRun } from './seeder';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from './snake-naming.strategy';
import { join } from 'path';
const { HOST, PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;
import { createConnection } from 'typeorm';

async function bootstrap() {
  const connectionOptions = {
    type: 'postgres',
    host: HOST,
    port: PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: 'postgres',
    namingStrategy: new SnakeNamingStrategy(),
    entities: [join(__dirname, './modules/public/**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, './migrations/public/*{.ts,.js}')],
  };

  const adminConnection = await createConnection(connectionOptions as DataSourceOptions);

  try {
    // Check if the database already exists
    const databaseExists = await adminConnection.query(`SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'`);

    if (!databaseExists.length) {
      // Create a new database if it doesn't exist
      await adminConnection.query(`CREATE DATABASE ${DB_NAME}`);
      console.log(`Database '${DB_NAME}' created successfully.`);
    } else {
      console.log(`Database '${DB_NAME}' already exists.`);
    }
  } catch (error) {
    console.error('Error checking/creating the database:', error);
  } finally {
    // Close the temporary connection
    await adminConnection.close();
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(tenancyMiddleware);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  (await connectionSource.connect()).runMigrations().then(async () => {
    await seederRun(connectionSource);
    const tenants = await connectionSource.query('SELECT connection_string FROM tenants;');

    for (let i = 0; i < tenants.length; i += 1) {
      const { connection_string } = tenants[i];
      console.log('RUN:', connection_string);

      if (connection_string) {
        try {
          const connection = await getTenantConnection(connection_string);

          await connection.runMigrations();
          await connection.close();
        } catch (error) {
          console.log(error);
        }
      }
    }
  });

  await app.listen(3000, () => {});
}

bootstrap();
