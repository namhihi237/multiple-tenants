import { Injectable } from '@nestjs/common';
import { UserRole } from './user-role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { RoleEnum } from '../../../enums/role.enum';
import { RoleService } from '../role/role.service';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    private readonly roleService: RoleService,
    private readonly permissionService: PermissionService,
  ) {}

  async create(userId: number, roleName: RoleEnum, connection?: DataSource) {
    const userRoleRepository = connection ? connection.getRepository(UserRole) : this.userRoleRepository;
    // TODO: need to update use connection
    const role = await this.roleService.findByName(roleName);
    const rolePermissions = await this.permissionService.getPermissionsByRole([role.id]);
    const useRoles = rolePermissions.map(rolePermission => {
      return { userId, roleId: role.id, permissionId: rolePermission.id };
    });
    userRoleRepository.insert(useRoles);
  }
}
