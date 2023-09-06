import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { EmailSubscriber } from '@project/shared/app-types';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT } from './mail.constants';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService
  ) {}

  public async sendNotifyNewSubscriber(subscriber: EmailSubscriber) {
    await this.mailerService.sendMail({
      from: this.configService.get('notify-app.mailer.from'),
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.name}`,
        email: `${subscriber.email}`,
      }
    })
    .catch((err) => {
      throw new Error(
        `The email wasn't sent.
        Error message: ${err.message}`
      );
    });
  }
}
