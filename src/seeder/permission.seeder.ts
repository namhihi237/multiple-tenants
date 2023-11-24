import { DataSource } from 'typeorm';
import { Role } from '../modules/public/user/entity/role.entity';
import { RoleEnum } from '../enums/role.enum';
import { User } from '../modules/public/role/user.entity';
import { hash } from 'bcrypt';
import { UserRole } from '../modules/public/user-role/user-role.entity';

export const seederAdmin = async (connectionSource: DataSource): Promise<void> => {
  try {
    console.log('RUN: seederAdmin');

    const host = await connectionSource.getRepository(Role).findOne({ where: { name: RoleEnum.Host } });
    let createdHostRole: Role;
    if (!host) {
      const newHost = await connectionSource.getRepository(Role).create({ name: RoleEnum.Host });
      createdHostRole = await connectionSource.getRepository(Role).save(newHost);
    }

    const tenant = await connectionSource.getRepository(Role).findOne({ where: { name: RoleEnum.Tenant } });
    if (!tenant) {
      const newTenant = await connectionSource.getRepository(Role).create({ name: RoleEnum.Tenant });
      await connectionSource.getRepository(Role).save(newTenant);
    }
    const userName = process.env.HOST_USERNAME || 'host';
    const existAdmin = await connectionSource.getRepository(User).findOne({ where: { userName } });

    if (!existAdmin) {
      const hashPassword = await hash(process.env.HOST_ACCOUNT_PASSWORD || 'admin123!@#', 10);
      const newAdmin = connectionSource.getRepository(User).create({
        userName,
        password: hashPassword,
        email: 'host@example.com',
        surname: 'host',
        normalizeUserName: 'normalize_user_name host',
        normalizeEmail: 'host@example.com',
        name: 'host user',
      });

      const createdHost = await connectionSource.getRepository(User).save(newAdmin);

      const newUserRule = connectionSource
        .getRepository(UserRole)
        .create({ userId: createdHost.id, roleId: createdHostRole.id });

      connectionSource.getRepository(UserRole).save(newUserRule);
    }

    console.log('DONE SEED');
  } catch (error) {
    console.log(error);
  }
};
