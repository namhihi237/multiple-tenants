import { DataSource } from 'typeorm';
import { Role } from '../modules/public/role/role.entity';
import { RoleEnum } from '../enums/role.enum';
import { User } from '../modules/public/user/user.entity';
import { hash } from 'bcrypt';

export const seederHost = async (connectionSource: DataSource): Promise<void> => {
  try {
    console.log('RUN: seeder create host');

    const host: Role = await connectionSource.getRepository(Role).findOne({ where: { name: RoleEnum.Host } });

    if (!host) {
      console.log('No host role ');
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

      await connectionSource.getRepository(User).save(newAdmin);
    }

    console.log('DONE SEED create host');
  } catch (error) {
    console.log(error);
  }
};
