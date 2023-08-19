import { Module } from '@nestjs/common';

import { ProfileModule } from './profile/profile.module';
import { ConfigAppsModule } from '@project/config/config-mongo';

@Module({
  imports: [ProfileModule, ConfigAppsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
