import { Module } from '@nestjs/common';

import { UserMemoryRepository } from '@project/shared/repositories';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  providers: [UserMemoryRepository, AuthService],
  exports: [UserMemoryRepository],
  controllers: [AuthController],
})
export class AuthModule {}
