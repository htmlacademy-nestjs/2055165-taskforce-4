import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app/app.module';
import { RequestIdInterceptor } from './app/shared/interceptors/request-id.interceptor';
import { AxiosExceptionFilter } from './app/shared/filters/axios-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalFilters(new AxiosExceptionFilter())
  app.useGlobalInterceptors(new RequestIdInterceptor());

  const configService = app.get(ConfigService)

  const port = configService.getOrThrow<string>('gateway.port');
  const env = configService.getOrThrow<string>('gateway.environment');
  await app.listen(port);

  Logger.log( `🚀  Gateway is running on: http://localhost:${port}/${globalPrefix}` );
  Logger.log( `🎯  Current mode: ${env}` );
}

bootstrap();
