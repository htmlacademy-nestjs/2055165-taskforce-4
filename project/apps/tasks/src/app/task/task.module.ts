import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { RepliesModule } from '../replies/replies.module';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports:[RepliesModule, CategoriesModule],
  providers: [TaskService],
  controllers: [TaskController],
})
export class TaskModule {}
