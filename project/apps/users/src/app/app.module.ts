import { Module } from '@nestjs/common';

import { ProfileModule } from './profile/profile.module';
import { ConfigMongoModule } from '@project/config/config-mongo';
import { PrismaMongoModule } from '@project/database-service';

@Module({
  imports: [ProfileModule, ConfigMongoModule, PrismaMongoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
