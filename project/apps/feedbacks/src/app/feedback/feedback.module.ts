import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { DatabaseModule, FeedbackRepository, UserRepository } from '@project/database-service';
import { CommentModule } from '../comment/comment.module';
import { ConfigAppsModule } from '@project/config-service';

@Module({
  imports: [
    ConfigAppsModule,
    DatabaseModule,
    CommentModule
  ],
  providers: [FeedbackService, FeedbackRepository, UserRepository],
  controllers: [FeedbackController]
})
export class FeedbackModule {}
