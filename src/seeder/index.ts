import { seederAdmin } from './permission.seeder';

export const seederRun = async connectionSource => {
  await seederAdmin(connectionSource);
};
