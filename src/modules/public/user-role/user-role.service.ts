import { Injectable } from '@nestjs/common';
import { UserRole } from './user-role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEnum } from '../../../enums/role.enum';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserRoleService {
  constructor(
    @InjectRepository(UserRole)
    private readonly userRoleRepository: Repository<UserRole>,
    private readonly roleService: RoleService,
  ) {}

  async create(userId: number, roleName: RoleEnum) {
    const role = await this.roleService.findByName(roleName);
    const userRole = this.userRoleRepository.create({ userId, roleId: role.id });
    return this.userRoleRepository.save(userRole);
  }
}
