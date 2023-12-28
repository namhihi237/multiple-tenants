import { createConnection, getConnectionManager } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { tenantsOrmconfig } from '../../tenants-orm.config';
import { connectionSource } from '../../orm.config';
const { HOST, PORT, DB_NAME, DB_USERNAME, DB_PASSWORD } = process.env;

export function getTenantConnection(connectionString: string): Promise<any> {
  if (!connectionString) {
    return Promise.reject(new Error('Connection string is required.'));
  }

  const connectionManager = getConnectionManager();
  const connectionName = `tenant_${connectionString}`;

  if (connectionManager.has(connectionName)) {
    const connection = connectionManager.get(connectionName);
    return Promise.resolve(connection.isConnected ? connection : connection.connect());
  }

  const ormConfig = tenantsOrmconfig(connectionString);

  return createConnection({
    ...(ormConfig as PostgresConnectionOptions),
    name: connectionName,
    schema: 'public',
  });
}

export async function getTenantConnectionById(tenantId: string): Promise<any> {
  const data = await connectionSource.query(`SELECT connection_string FROM tenants where id = ${tenantId}`);

  const defaultConnection = `postgres://${DB_USERNAME}:${DB_PASSWORD}@${HOST}:${PORT}/${DB_NAME}`;
  const connectionString = data.length ? data[0].connection_string : defaultConnection;
  const connectionManager = getConnectionManager();
  const connectionName = `tenant_${connectionString}`;

  if (connectionManager.has(connectionName)) {
    const connection = connectionManager.get(connectionName);
    return Promise.resolve(connection.isConnected ? connection : connection.connect());
  }

  const ormConfig = tenantsOrmconfig(connectionString);

  return createConnection({
    ...(ormConfig as PostgresConnectionOptions),
    name: connectionName,
    schema: 'public',
  });
}
