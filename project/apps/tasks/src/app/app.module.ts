import { Module } from '@nestjs/common';

import { TaskModule } from './task/task.module';
import { RepliesModule } from './replies/replies.module';
import { CategoryModule } from './category/category.module';
import { PrismaPostgresModule } from '@project/database-service';

@Module({
  imports: [CategoryModule, TaskModule, RepliesModule, PrismaPostgresModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
