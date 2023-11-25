import { seederHost } from './host.seeder';
import { seederRoles } from './permission.seeder';

export const seederRun = async connectionSource => {
  await seederRoles(connectionSource);
  await seederHost(connectionSource);
};
