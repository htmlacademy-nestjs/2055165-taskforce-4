import { SubscriberDTO } from './dto/subscriber.dto';
import { EmailSubscriberService } from './email-subscriber.service';
import { Controller } from '@nestjs/common';
import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { RabbitRouting } from '@project/shared/app-types';
import { MailService } from '../mailer/mail.service';

@Controller()
export class EmailSubscriberController {
  constructor(
    private readonly subscriberService: EmailSubscriberService,
    private readonly mailService: MailService,
  ) {}

  @RabbitSubscribe({
    exchange: process.env.RABBIT_EXCHANGE,
    routingKey: RabbitRouting.WelcomeMessage,
    queue: process.env.RABBIT_QUEUE,
  })
  public async sendWelcomeMessage(subscriber: SubscriberDTO) {
    await this.mailService.sendWelcomeMessageNewUser(subscriber);
  }


  @RabbitSubscribe({
    exchange: process.env.RABBIT_EXCHANGE,
    routingKey: RabbitRouting.AddSubscriber,
    queue: process.env.RABBIT_QUEUE,
  })
  public async addSubscriber(subscriber: SubscriberDTO) {
    const newSub = await this.subscriberService.addSubscriber(subscriber);
    await this.mailService.sendSubscribeMessage(newSub);
  }
}
