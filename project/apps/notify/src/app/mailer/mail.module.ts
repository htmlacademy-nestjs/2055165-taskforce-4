import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';

import { MailService } from './mail.service';
import { getMailerAsyncOptions } from '@project/util/util-core';
import { ConfigAppsModule } from '@project/config-service';

@Module({
  imports: [
    MailerModule.forRootAsync(getMailerAsyncOptions('notify-app.mailer')),
    ConfigAppsModule
  ],
  providers: [MailService],
  exports: [MailService]
})
export class MailModule {}
