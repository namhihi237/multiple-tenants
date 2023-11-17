import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { connectionSource } from './orm.config';
import { getTenantConnection } from './modules/tenancy/tenancy.utils';
import { tenancyMiddleware } from './modules/tenancy/tenancy.middleware';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptor/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(tenancyMiddleware);

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useGlobalInterceptors(new TransformInterceptor());

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
