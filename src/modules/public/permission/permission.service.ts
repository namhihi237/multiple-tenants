import { Injectable } from '@nestjs/common';
import { Permission } from './permission.entity';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async getPermissionsByRole(roleIds: number[]): Promise<Permission[]> {
    return this.permissionRepository.find({
      where: {
        role: {
          id: In(roleIds),
        },
      },
    });
  }
}
