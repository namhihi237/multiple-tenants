import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './modules/public/tenants/tenants.module';
import typeorm from './orm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TenancyModule } from './modules/tenancy/tenancy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => configService.get('typeorm'),
    }),
    TenantsModule,
    TenancyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
