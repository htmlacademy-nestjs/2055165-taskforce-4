import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const configService = app.get(ConfigService)
  app.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}))

  const port = configService.getOrThrow<string>('auth-application.port');
  await app.listen(port);

  Logger.log( `🚀  Auth Application is running on: http://localhost:${port}/${globalPrefix}` );
  Logger.log( `🎯  Current mode: ${configService.get('auth-application.environment')}` );
}

bootstrap();
