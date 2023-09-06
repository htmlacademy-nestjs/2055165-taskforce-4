import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { MailService } from './mail.service';
import { getMailerAsyncOptions } from '@project/util/util-core';
import { ConfigAppsModule } from '@project/config-service';
import { DatabaseModule } from '@project/database-service';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions('notify-app.mailer')),
    ConfigAppsModule,
    DatabaseModule
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
