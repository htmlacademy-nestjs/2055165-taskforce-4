import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ConfigAppsModule } from '@project/config-service';
import { RefreshTokenModule } from './refresh-token/refresh-token.module';

@Module({
  imports: [AuthModule, ConfigAppsModule, RefreshTokenModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
