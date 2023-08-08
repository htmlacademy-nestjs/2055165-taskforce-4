import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserMemoryRepository } from '@project/database-service';

@Module({
  providers: [AuthService, UserMemoryRepository],
  controllers: [AuthController],
  exports: [UserMemoryRepository]
})
export class AuthModule {}
