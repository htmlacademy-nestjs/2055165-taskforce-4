import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { DatabaseModule, UserRepository } from '@project/database-service';

@Module({
  imports: [DatabaseModule],
  controllers: [ProfileController],
  providers: [ProfileService, UserRepository],
  exports: [UserRepository]
})
export class ProfileModule {}
