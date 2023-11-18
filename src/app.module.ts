import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantsModule } from './modules/public/tenants/tenants.module';
import typeorm from './orm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TenancyModule } from './modules/tenancy/tenancy.module';
import { UserModule } from './modules/public/user/user.module';
import { AuthModule } from './modules/public/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TestModule } from './modules/tenanted/test/test.module';
import { DbServerModule } from './modules/public/db-server/db-server.module';

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
    UserModule,
    AuthModule,
    TestModule,
    DbServerModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    AppService,
  ],
})
export class AppModule {}
