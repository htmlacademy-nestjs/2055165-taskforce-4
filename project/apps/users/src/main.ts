import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const configService = app.get(ConfigService)

  const port = configService.getOrThrow<string>('users-application.port');
  await app.listen(port);

  Logger.log( `🚀  Users Application is running on: http://localhost:${port}/${globalPrefix}` );
  Logger.log( `🎯  Current mode: ${configService.get('users-application.environment')}` );
}

bootstrap();
