import { Module } from '@nestjs/common';

import { ProfileModule } from './profile/profile.module';
import { ConfigMongoModule } from '@project/config/config-mongo';

@Module({
  imports: [ProfileModule, ConfigMongoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
