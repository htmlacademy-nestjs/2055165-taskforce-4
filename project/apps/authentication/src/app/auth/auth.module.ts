import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository, DatabaseModule, JwtAccessStrategy} from '@project/database-service';
import { JwtService } from '@nestjs/jwt';

import {ConfigAppsModule} from '@project/config-service'
import { NotifyModule } from '@project/shared/notify';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';

@Module({
  imports: [
    ConfigAppsModule,
    DatabaseModule,
    NotifyModule,
    RefreshTokenModule,
  ],
  providers: [
    JwtService,
    AuthService,
    UserRepository,
    JwtAccessStrategy,
    LocalStrategy,
    JwtRefreshStrategy
    ],
  controllers: [AuthController]
})
export class AuthModule {}
