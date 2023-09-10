import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { DatabaseModule, JwtAccessStrategy, UserRepository } from '@project/database-service';
import { ConfigAppsModule, ConfigGatewayModule, getJwtAccessOptions } from '@project/config-service';
import { NotifyModule } from '@project/shared/notify';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    DatabaseModule,
    ConfigAppsModule,
    NotifyModule,
    JwtModule.registerAsync({
      imports: [ConfigAppsModule],
      inject: [ConfigService],
      useFactory: getJwtAccessOptions
    }),
    ConfigGatewayModule,
    HttpModule.registerAsync({
      imports: [ConfigGatewayModule],
      useFactory: async (config: ConfigService) => ({
        timeout: config.getOrThrow<number>('gateway.httpTimeout'),
        maxRedirects: config.getOrThrow<number>('gateway.redirectsCount')
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [ProfileController],
  providers: [ProfileService, UserRepository, JwtAccessStrategy],
})
export class ProfileModule {}
