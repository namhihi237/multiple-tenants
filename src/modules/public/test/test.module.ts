import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './test.entity';

@Module({
  providers: [TestService],
  controllers: [TestController],
  imports: [TypeOrmModule.forFeature([Test])],
  exports: [TestService],
})
export class TestModule {}
