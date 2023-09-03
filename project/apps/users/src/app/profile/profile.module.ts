import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { DatabaseModule, JwtAccessStrategy, UserRepository } from '@project/database-service';
import { ConfigAppsModule } from '@project/config-service';

@Module({
  imports: [DatabaseModule,ConfigAppsModule],
  controllers: [ProfileController],
  providers: [ProfileService, UserRepository, JwtAccessStrategy],
})
export class ProfileModule {}
