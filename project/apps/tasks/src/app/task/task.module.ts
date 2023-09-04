import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { CategoryRepository, DatabaseModule, ReplyRepository, TaskRepository } from '@project/database-service';

@Module({
  imports:[DatabaseModule],
  providers: [TaskService, TaskRepository, CategoryRepository, ReplyRepository],
  controllers: [TaskController],
})
export class TaskModule {}
