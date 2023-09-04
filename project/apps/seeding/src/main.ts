import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { fillDB } from '@project/database-service';

import { AppModule } from './app/app.module';
import { DatabaseService } from '@project/database-service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataBaseService = app.get<DatabaseService>(DatabaseService);

  await fillDB(dataBaseService.prismaBaseMongoConnector, dataBaseService.prismaPostgresConnector)

  Logger.log('🚀 DBs successfully seeded!');

}

bootstrap();
