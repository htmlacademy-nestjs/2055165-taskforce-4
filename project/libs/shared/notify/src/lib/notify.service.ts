import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RabbitRouting } from '@project/shared/app-types';

@Injectable()
export class NotifyService {
  constructor(
    private readonly rabbitClient: AmqpConnection,
    private readonly configService: ConfigService,
  ) {}


  public async sendNotification<T extends Record<string, unknown>>(dto: T, queue: RabbitRouting) {
    return this.rabbitClient.publish<T>(
      this.configService.getOrThrow<string>('rabbit.exchange'),
      queue,
      { ...dto }
    );
  }


}
