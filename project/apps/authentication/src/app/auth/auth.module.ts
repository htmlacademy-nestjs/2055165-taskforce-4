import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository, DatabaseModule, JwtAccessStrategy} from '@project/database-service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import {ConfigAppsModule, getJwtOptions} from '@project/config-service'
import { NotifyModule } from '../notify/notify.module';

@Module({
  imports: [
    ConfigAppsModule,
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigAppsModule],
      inject: [ConfigService],
      useFactory: getJwtOptions
    }),
    NotifyModule
  ],
  providers: [AuthService, UserRepository, JwtAccessStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
