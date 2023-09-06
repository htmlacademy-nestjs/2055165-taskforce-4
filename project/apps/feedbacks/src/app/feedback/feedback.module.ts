import { Module } from '@nestjs/common';
import { FeedbackController } from './feedback.controller';
import { FeedbackService } from './feedback.service';
import { DatabaseModule, FeedbackRepository, JwtAccessStrategy, UserRepository } from '@project/database-service';
import { CommentModule } from '../comment/comment.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { ConfigAppsModule, getJwtOptions } from '@project/config-service';

@Module({
  imports: [
    ConfigAppsModule,
    DatabaseModule,
    CommentModule,
    JwtModule.registerAsync({
      imports: [ConfigAppsModule],
      inject: [ConfigService],
      useFactory: getJwtOptions
    })
  ],
  providers: [FeedbackService, FeedbackRepository, UserRepository, JwtAccessStrategy],
  controllers: [FeedbackController]
})
export class FeedbackModule {}
