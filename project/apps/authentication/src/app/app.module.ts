import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { ConfigMongoModule } from '@project/config/config-mongo';

@Module({
  imports: [AuthModule, ConfigMongoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
