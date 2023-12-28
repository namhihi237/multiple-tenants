import { Body, Controller, Post } from '@nestjs/common';
import { TestService } from './test.service';

@Controller('api/test')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post()
  async createTest(@Body() name: string) {
    return this.testService.create(name);
  }
}
