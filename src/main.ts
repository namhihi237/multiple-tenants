import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectionSource } from './orm.config';
import { getTenantConnection } from './modules/tenancy/tenancy.utils';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptor/response.interceptor';
import * as express from 'express';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  app.useGlobalInterceptors(new TransformInterceptor());

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ limit: '50mb', extended: true }));

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await connectionSource.connect();
  const schemas = await connectionSource.query('select schema_name as name from information_schema.schemata;');
  console.log(schemas);

  for (let i = 0; i < schemas.length; i += 1) {
    const { name: schema } = schemas[i];
    if (schema.startsWith('tenant_')) {
      const tenantId = schema.replace('tenant_', '');
      const connection = await getTenantConnection(tenantId);
      await connection.runMigrations();
      await connection.close();
    }
  }
  await app.listen(3000, () => {});
}
bootstrap();
