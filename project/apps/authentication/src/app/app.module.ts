import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ConfigAppsModule } from '@project/config-service';
import { NotifyModule } from './notify/notify.module';

@Module({
  imports: [AuthModule, ConfigAppsModule, NotifyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
