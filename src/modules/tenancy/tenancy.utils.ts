import { createConnection, getConnectionManager } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { tenantsOrmconfig } from '../../tenants-orm.config';

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
