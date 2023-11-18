import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectionSource } from './orm.config';
import { getTenantConnection } from './modules/tenancy/tenancy.utils';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptor/response.interceptor';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';
import { tenancyMiddleware } from './modules/tenancy/tenancy.middleware';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  app.useGlobalInterceptors(new TransformInterceptor());
  app.use(tenancyMiddleware);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  (await connectionSource.connect()).runMigrations();

  const tenants = await connectionSource.query('SELECT connection_string FROM tenants;');
  console.log(tenants);

  for (let i = 0; i < tenants.length; i += 1) {
    const { connection_string } = tenants[i];
    console.log('RUN:', connection_string);

    if (connection_string) {
      try {
        const connection = await getTenantConnection(connection_string);

        await connection.runMigrations();
        await connection.close();
      } catch (error) {
        console.log(error);
      }
    }
  }
  await app.listen(3000, () => {});
}

bootstrap();
