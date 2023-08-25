import { Module, forwardRef } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { ReplyModule } from '../replies/reply.module';
import { CategoryModule } from '../category/category.module';
import { DatabaseModule, TaskRepository } from '@project/database-service';

@Module({
  imports:[DatabaseModule, forwardRef(() => ReplyModule), CategoryModule],
  providers: [TaskService, TaskRepository],
  controllers: [TaskController],
  exports: [TaskService]
})
export class TaskModule {}
