import { Injectable } from '@nestjs/common';
import { UserRole } from './user-role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async create(userId: number, roleName: RoleEnum) {
    const role = await this.roleService.findByName(roleName);
    const rolePermissions = this.permissionService.getPermissionsByRole([role.id]);
    const useRoles = (await rolePermissions).map(rolePermission => {
      return { userId, roleId: role.id, permissionId: rolePermission.id };
    });
    this.userRoleRepository.insert(useRoles);
  }
}
