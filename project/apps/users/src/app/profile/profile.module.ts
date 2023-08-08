import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { UserMemoryRepository } from '@project/database-service';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, UserMemoryRepository],
  exports: [UserMemoryRepository]
})
export class ProfileModule {}
