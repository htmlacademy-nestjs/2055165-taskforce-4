import { Module } from '@nestjs/common';

import { ConfigAppsModule } from '@project/config-service';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { MailModule } from './mailer/mail.module';

@Module({
  imports: [ConfigAppsModule, EmailSubscriberModule, MailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
