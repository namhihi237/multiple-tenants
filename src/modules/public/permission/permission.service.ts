import { Injectable } from '@nestjs/common';
import { Permission } from './permission.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: Repository<Permission>) {}

  async getPermissionsByRole(roleIds: number[]): Promise<Permission[]> {
    return this.permissionRepository.find({
      where: {
        roles: {
          id: In(roleIds),
        },
      },
    });
  }
}
