import { Module, forwardRef } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { DatabaseModule, ReplyRepository } from '@project/database-service';
import { TaskModule } from '../task/task.module';

@Module({
  imports: [DatabaseModule, forwardRef(() => TaskModule)],
  providers: [ReplyService, ReplyRepository],
  controllers: [ReplyController],
  exports: [ReplyService],
})
export class ReplyModule {}
