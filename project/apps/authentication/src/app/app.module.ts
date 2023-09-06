import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ConfigAppsModule } from '@project/config-service';

@Module({
  imports: [AuthModule, ConfigAppsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
