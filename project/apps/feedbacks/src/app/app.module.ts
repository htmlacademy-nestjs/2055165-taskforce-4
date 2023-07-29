import { Module } from '@nestjs/common';

import { FeedbackModule } from './feedback/feedback.module';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [FeedbackModule, CommentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
