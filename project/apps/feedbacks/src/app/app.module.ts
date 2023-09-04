import { Module } from '@nestjs/common';

import { FeedbackModule } from './feedback/feedback.module';
import { CommentModule } from './comment/comment.module';
import { ConfigAppsModule } from '@project/config-service';

@Module({
  imports: [FeedbackModule, CommentModule, ConfigAppsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
