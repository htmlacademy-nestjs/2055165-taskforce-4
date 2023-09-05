import { Module } from '@nestjs/common';

import { DatabaseModule,EmailSubscriberRepository} from '@project/database-service';
import { EmailSubscriberService } from './email-subscriber.service';
import { EmailSubscriberController } from './email-subscriber.controller';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { getRabbitMQOptions } from '@project/util/util-core';

@Module({
  imports: [
    DatabaseModule,
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('notify-app.rabbit')
    ),
  ],
  providers: [EmailSubscriberService, EmailSubscriberRepository, EmailSubscriberController],
  controllers: [EmailSubscriberController],
})
export class EmailSubscriberModule {}
