import { DataSource } from 'typeorm';
import { Role } from '../modules/public/role/role.entity';
import { RoleEnum } from '../enums/role.enum';
import { Permission } from '../modules/public/permission/permission.entity';
import { PermissionEnum } from '../enums/permission.enum';

export const seederRoles = async (connectionSource: DataSource): Promise<void> => {
  try {
    console.log('RUN: seederRoles');

    // seed host role
    const host = await connectionSource.getRepository(Role).findOne({ where: { name: RoleEnum.Host } });
    if (!host) {
      const newHost = await connectionSource.getRepository(Role).create({ name: RoleEnum.Host });
      await connectionSource.getRepository(Role).save(newHost);
    }

    // seed tenant role
    const tenant = await connectionSource.getRepository(Role).findOne({ where: { name: RoleEnum.Tenant } });
    if (!tenant) {
      const newTenant = connectionSource.getRepository(Role).create({ name: RoleEnum.Tenant });
      const tenantRole = await connectionSource.getRepository(Role).save(newTenant);
      const tenantPermissions = [{ displayName: 'Get User', name: PermissionEnum.GET_USER, roleId: tenantRole.id }];
      connectionSource.getRepository(Permission).insert(tenantPermissions);
    }

    console.log('DONE SEED seederRoles');
  } catch (error) {
    console.log(error);
  }
};
