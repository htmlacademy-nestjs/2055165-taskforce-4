import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ConfigMongoModule } from '@project/config/config-mongo';
import { PrismaMongoModule } from '@project/database-service';

@Module({
  imports: [AuthModule, ConfigMongoModule, PrismaMongoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
