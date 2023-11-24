import { Injectable } from '@nestjs/common';
import { Role } from '../user/entity/role.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findByName(name: string): Promise<Role> {
    return this.roleRepository.findOne({ where: { name } });
  }
}
