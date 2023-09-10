import { Module } from '@nestjs/common';

import { CommentService } from './comment.service';
import { FeedbackController } from '../feedback/feedback.controller';
import { CommentRepository, DatabaseModule, FeedbackRepository, JwtAccessStrategy, UserRepository } from '@project/database-service';
import { FeedbackService } from '../feedback/feedback.service';
import { ConfigAppsModule, getJwtAccessOptions } from '@project/config-service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    ConfigAppsModule,
    JwtModule.registerAsync({
      imports: [ConfigAppsModule],
      inject: [ConfigService],
      useFactory: getJwtAccessOptions
    })
  ],
  providers: [FeedbackService, CommentService, CommentRepository, UserRepository, FeedbackRepository, JwtAccessStrategy],
  exports: [CommentService],
  controllers: [FeedbackController],
})
export class CommentModule {}
