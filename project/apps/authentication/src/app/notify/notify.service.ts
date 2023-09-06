import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { CreateSubscriberDTO } from '../auth/dto/create-subscriber.dto';
import { ConfigService } from '@nestjs/config';
import { RabbitRouting } from '@project/shared/app-types';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    private readonly configService: ConfigService,
  ) {}

  public async registerSubscriber(dto: CreateSubscriberDTO) {
    return this.rabbitClient.publish<CreateSubscriberDTO>(
      this.configService.get('rabbit.exchange') as string,
      RabbitRouting.AddSubscriber,
      { ...dto }
    );
  }
}
