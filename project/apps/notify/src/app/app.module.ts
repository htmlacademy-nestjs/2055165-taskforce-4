import { Module } from '@nestjs/common';

import { ConfigAppsModule } from '@project/config-service';
import { EmailSubscriberModule } from './email-subscriber/email-subscriber.module';
import { MailModule } from './mailer/mail.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigAppsModule,
    EmailSubscriberModule,
    MailModule,
    ScheduleModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
