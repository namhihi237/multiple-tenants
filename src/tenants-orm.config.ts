import { join } from 'path';
import { SnakeNamingStrategy } from './snake-naming.strategy';

export function tenantsOrmconfig(connectionString: string) {
  if (!connectionString) {
    throw new Error('Connection string is required.');
  }

  const [type, DB_USERNAME, DB_PASSWORD, HOST, PORT, DB_NAME] = parseConnectionString(connectionString);

  const config = {
    type: type as 'postgres' | 'mysql' | 'mariadb' | 'sqlite' | 'oracle' | 'mssql',
    host: HOST,
    port: parseInt(PORT),
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    namingStrategy: new SnakeNamingStrategy(),
    logging: true,
    autoLoadEntities: true,
  };

  return {
    ...config,
    entities: [join(__dirname, './modules/public/**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, './migrations/public/*{.ts,.js}')],
  };
}

function parseConnectionString(connectionString: string): [string, string, string, string, string, string] {
  const regex = /^(.*?):\/\/(.*?):(.*?)@(.*?):(.*?)\/(.*)/;
  const match = connectionString.match(regex);

  if (!match || match.length < 7) {
    throw new Error('Invalid connection string format');
  }

  // Extract relevant parts
  const [, type, username, password, host, port, database] = match;

  return [type, username, password, host, port, database];
}
