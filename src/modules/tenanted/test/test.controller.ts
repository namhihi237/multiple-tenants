import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { TestService } from './test.service';
import { CreateTestDto } from './test.dto';
import { Test } from './test.entity';
import { AuthGuard } from '../../public/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('/api/tenanted/test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  create(@Body() createTestDto: CreateTestDto): Promise<Test> {
    return this.testService.create(createTestDto);
  }
}
