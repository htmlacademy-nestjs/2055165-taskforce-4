import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { DatabaseModule, JwtAccessStrategy, UserRepository } from '@project/database-service';
import { ConfigAppsModule, getJwtAccessOptions } from '@project/config-service';
import { NotifyModule } from '@project/shared/notify';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    DatabaseModule,
    ConfigAppsModule,
    NotifyModule,
    JwtModule.registerAsync({
      imports: [ConfigAppsModule],
      inject: [ConfigService],
      useFactory: getJwtAccessOptions
    }),],
  controllers: [ProfileController],
  providers: [ProfileService, UserRepository, JwtAccessStrategy],
})
export class ProfileModule {}
