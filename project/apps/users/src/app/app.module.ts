import { Module } from '@nestjs/common';

import { ProfileModule } from './profile/profile.module';
import { ConfigAppsModule } from '@project/config-service';

@Module({
  imports: [ProfileModule, ConfigAppsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
