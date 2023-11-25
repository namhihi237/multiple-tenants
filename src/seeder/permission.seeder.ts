import { DataSource } from 'typeorm';
import { Role } from '../modules/public/user/role.entity';
import { RoleEnum } from '../enums/role.enum';

export const seederRoles = async (connectionSource: DataSource): Promise<void> => {
  try {
    console.log('RUN: seederRoles');

    const host = await connectionSource.getRepository(Role).findOne({ where: { name: RoleEnum.Host } });
    if (!host) {
      const newHost = await connectionSource.getRepository(Role).create({ name: RoleEnum.Host });
      await connectionSource.getRepository(Role).save(newHost);
    }

    const tenant = await connectionSource.getRepository(Role).findOne({ where: { name: RoleEnum.Tenant } });
    if (!tenant) {
      const newTenant = await connectionSource.getRepository(Role).create({ name: RoleEnum.Tenant });
      await connectionSource.getRepository(Role).save(newTenant);
    }

    console.log('DONE SEED seederRoles');
  } catch (error) {
    console.log(error);
  }
};
