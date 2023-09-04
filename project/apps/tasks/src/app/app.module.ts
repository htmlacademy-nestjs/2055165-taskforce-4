import { Module } from '@nestjs/common';

import { TaskModule } from './task/task.module';
import { ReplyModule } from './replies/reply.module';
import { CategoryModule } from './category/category.module';
import { ConfigAppsModule } from '@project/config-service';

@Module({
  imports: [CategoryModule, TaskModule, ReplyModule, ConfigAppsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
