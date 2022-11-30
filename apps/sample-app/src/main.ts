import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as rTracer from 'cls-rtracer';
import { Exception, Server, Service } from '@andreafspeziale/common';
import { CoreModule } from './core/core.module';
import type { Config } from './config';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
async function bootstrap() {
  const app = await NestFactory.create(CoreModule);

  const cs = app.get(ConfigService<Config, true>);
  const { host, port, apiPrefix, swagger } = cs.get<Server>('server');
  const { name, version } = cs.get<Service>('service');

  app.setGlobalPrefix(apiPrefix);
  app.enableVersioning({
    type: VersioningType.URI,
  });

  if (swagger) {
    const swaggerConfig = new DocumentBuilder()
      .setTitle(name)
      .setDescription(`${name} RESTful API service.`)
      .setVersion(version)
      .build();

    const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig, {
      extraModels: [Exception],
    });

    SwaggerModule.setup('swagger', app, swaggerDocument);
  }

  app.use(rTracer.expressMiddleware());
  app.enableShutdownHooks();

  await app.listen(port, host);
}
bootstrap();
