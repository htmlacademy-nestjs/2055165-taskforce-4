import { Module } from '@nestjs/common';

import { CommentService } from './comment.service';
import { FeedbackController } from '../feedback/feedback.controller';
import { CommentRepository, DatabaseModule, FeedbackRepository, UserRepository } from '@project/database-service';
import { FeedbackService } from '../feedback/feedback.service';

@Module({
  imports: [DatabaseModule],
  providers: [FeedbackService, CommentService, CommentRepository, UserRepository, FeedbackRepository],
  exports: [CommentService],
  controllers: [FeedbackController],
})
export class CommentModule {}
