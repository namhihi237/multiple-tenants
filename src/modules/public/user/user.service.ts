import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(key: string, value: string) {
    return this.usersRepository.findOne({
      where: {
        [key]: value,
      },
    });
  }
}
