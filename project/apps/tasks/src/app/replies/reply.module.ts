import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { DatabaseModule, ReplyRepository, TaskRepository } from '@project/database-service';

@Module({
  imports: [DatabaseModule],
  providers: [ReplyService, ReplyRepository, TaskRepository],
  controllers: [ReplyController],
})
export class ReplyModule {}
