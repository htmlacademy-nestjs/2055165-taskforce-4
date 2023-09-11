import { Module } from '@nestjs/common';
import { RefreshTokenService } from './refresh-token.service';
import { DatabaseModule, DatabaseService, RefreshTokenRepository } from '@project/database-service';
import { ConfigAppsModule } from '@project/config-service';

@Module({
  imports: [ConfigAppsModule, DatabaseModule],
  providers: [RefreshTokenService, RefreshTokenRepository, DatabaseService],
  exports: [RefreshTokenService]
})
export class RefreshTokenModule {}
