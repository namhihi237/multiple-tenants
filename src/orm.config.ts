import 'dotenv/config';
import { registerAs } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

import { SnakeNamingStrategy } from './snake-naming.strategy';
import { join } from 'path';
const { HOST, PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

export const config = {
  type: 'postgres',
  host: HOST,
  port: PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  namingStrategy: new SnakeNamingStrategy(),
  logging: true,
  autoLoadEntities: true,
  entities: [
    join(__dirname, './modules/public/**/*.entity{.ts,.js}'),
    join(__dirname, './modules/tenanted/**/*.entity{.ts,.js}'),
  ],
  migrations: [join(__dirname, './migrations/public/*{.ts,.js}')],
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
