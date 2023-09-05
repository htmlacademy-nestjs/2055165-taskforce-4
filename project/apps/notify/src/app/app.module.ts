import { Module } from '@nestjs/common';

import { ConfigAppsModule } from '@project/config-service';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';

@Module({
  imports: [ConfigAppsModule, EmailSubscriberModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
