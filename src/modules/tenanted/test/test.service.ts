import { Inject, Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { Test } from './test.entity';
import { CreateTestDto } from './test.dto';
import { CONNECTION } from '../../tenancy/tenancy.symbols';

@Injectable()
export class TestService {
  private readonly testRepository: Repository<Test>;

  constructor(@Inject(CONNECTION) connection: Connection) {
    this.testRepository = connection.getRepository(Test);
  }

  create(createTestDto: CreateTestDto): Promise<Test> {
    const test = new Test();
    test.name = createTestDto.name;

    return this.testRepository.save(test);
  }
}
