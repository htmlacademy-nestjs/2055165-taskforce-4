import { Module } from '@nestjs/common';

import { TaskModule } from './task/task.module';
import { RepliesModule } from './replies/replies.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [TaskModule, RepliesModule, CategoriesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
