import { MailerService } from '@nestjs-modules/mailer';
import { Cron } from '@nestjs/schedule';
import dayjs from 'dayjs';

import { Injectable } from '@nestjs/common';
import { EMAIL_ADD_SUBSCRIBER_SUBJECT, NEW_TASKS_SUBJECT } from './mail.constants';
import { ConfigService } from '@nestjs/config';
import { SubscriberDTO } from '../email-subscriber/dto/subscriber.dto';
import { EmailSubscriber, TaskStatus } from '@project/shared/app-types';
import { DatabaseService } from '@project/database-service';

@Injectable()
export class MailService {
  private subscribersDB;
  private tasksDB;

  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    private readonly dbService: DatabaseService
  ) {
    this.subscribersDB = dbService.prismaNotifyMongoConnector;
    this.tasksDB = dbService.prismaPostgresConnector;
  }

  public async sendWelcomeMessageNewUser(user: SubscriberDTO) {
    await this.mailerService.sendMail({
      from: this.configService.get('notify-app.mailer.from'),
      to: user.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './welcome-email',
      context: {
        user: `${user.name}`,
      }
    })
    .catch((err) => {
      throw new Error(
        `The email wasn't sent.
        Error message: ${err.message}`
      );
    });
  }

  public async sendSubscribeMessage(subscriber: EmailSubscriber) {
    await this.mailerService.sendMail({
      from: this.configService.get('notify-app.mailer.from'),
      to: subscriber.email,
      subject: EMAIL_ADD_SUBSCRIBER_SUBJECT,
      template: './add-subscriber',
      context: {
        user: `${subscriber.name}`,
      }
    })
    .catch((err) => {
      throw new Error(
        `The email wasn't sent.
        Error message: ${err.message}`
      );
    });
  }

  @Cron(process.env.BROADCAST_TASKS_INTERVAL as string)
  private async broadcastNewTasks() {
    const subscribers = await this.subscribersDB.emailSubScriber.findMany({
      where: {
        isSubscribed: true
      }
    })

    await this.subscribersDB.$disconnect();

    if (subscribers.length === 0) {
      return;
    }

    const newTasks = await this.tasksDB.task.findMany({
      where: {
        status: TaskStatus.New,
        createdAt: {
          gt: dayjs().subtract(1, 'week').toDate()
        }
      }
    })

    await this.tasksDB.$disconnect();

    subscribers.forEach(async ({email, name}) => {
      if (newTasks.length === 0) {

        await this.mailerService.sendMail({
          from: this.configService.get('notify-app.mailer.from'),
          to: email,
          subject: NEW_TASKS_SUBJECT,
          template: './new-tasks-absent',
          context: {
            user: `${name}`,
          }
        })
        .catch((err) => {
          throw new Error(
            `The email wasn't sent.
            Error message: ${err.message}`
          );
        });

      } else {

        await this.mailerService.sendMail({
          from: this.configService.get('notify-app.mailer.from'),
          to: email,
          subject: NEW_TASKS_SUBJECT,
          template: './new-tasks',
          context: {
            user: `${name}`,
            tasks: newTasks
          }
        })
        .catch((err) => {
          throw new Error(
            `The email wasn't sent.
            Error message: ${err.message}`
          );
        });
      }
    })
  }

}


