import { Module } from '@nestjs/common';

import { TaskModule } from './task/task.module';
import { ReplyModule } from './replies/reply.module';
import { CategoryModule } from './category/category.module';
import { DatabaseModule } from '@project/database-service';

@Module({
  imports: [CategoryModule, TaskModule, ReplyModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
