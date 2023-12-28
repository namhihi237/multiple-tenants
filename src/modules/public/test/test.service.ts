import { Inject, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { Test } from './test.entity';
import { CONNECTION } from '../../tenancy/tenancy.symbols';

@Injectable()
export class TestService {
  private readonly testRepository: Repository<Test>;
  constructor(@Inject(CONNECTION) connection: Connection) {
    this.testRepository = connection.getRepository(Test);
  }

  async create(name: string) {
    const newTest = this.testRepository.create({ name });
    return this.testRepository.save(newTest);
  }
}
