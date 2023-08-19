import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { RepliesModule } from '../replies/replies.module';
import { CategoryModule } from '../category/category.module';
import { DatabaseModule, TaskRepository } from '@project/database-service';

@Module({
  imports:[DatabaseModule, RepliesModule, CategoryModule],
  providers: [TaskService, TaskRepository],
  controllers: [TaskController],
})
export class TaskModule {}
