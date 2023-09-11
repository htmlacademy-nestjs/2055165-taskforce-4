import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const configService = app.get(ConfigService)
  const port = configService.getOrThrow<string>('feedbacks-application.port');

  await app.listen(port);

  Logger.log( `🚀  Feedbacks Application is running on: http://localhost:${port}/${globalPrefix}` );
  Logger.log( `🎯  Current mode: ${configService.getOrThrow<string>('feedbacks-application.environment')}` );
}

bootstrap();
