import { Module } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository, DatabaseModule} from '@project/database-service';

@Module({
  imports: [DatabaseModule],
  providers: [AuthService, UserRepository],
  controllers: [AuthController],
  exports: [UserRepository]
})
export class AuthModule {}
