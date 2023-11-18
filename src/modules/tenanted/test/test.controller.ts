import { Controller, Body, Post } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './test.dto';
import { Test } from './test.entity';

@Controller('/api/tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  create(@Body() createTestDto: CreateTestDto): Promise<Test> {
    return this.testService.create(createTestDto);
  }
}
