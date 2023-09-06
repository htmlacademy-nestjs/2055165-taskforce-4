import { Module } from '@nestjs/common';
import { NotifyService } from './notify.service';
import { getRabbitMQOptions } from '@project/util/util-core';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { ConfigAppsModule } from '@project/config-service';

@Module({
  imports: [
    ConfigAppsModule,
    RabbitMQModule.forRootAsync(
      RabbitMQModule,
      getRabbitMQOptions('rabbit')
    )
  ],
  providers: [NotifyService],
  exports: [NotifyService]
})
export class NotifyModule {}
