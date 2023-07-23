import { Module } from '@nestjs/common';
import { AuthenticationModule } from './authentication/authentication.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [AuthenticationModule, ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
