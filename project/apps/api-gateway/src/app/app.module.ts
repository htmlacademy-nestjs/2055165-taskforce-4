import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

import { ConfigGatewayModule } from '@project/config-service'
import { AuthenticationController } from './services/authentication/authentication.controller';
import { CategoryController } from './services/categories/category.controller';
import { FeedbackController } from './services/feedbacks/feedback.controller';
import { ReplyController } from './services/replies/reply.controller';
import { StaticController } from './services/static/static.controller';
import { UserController } from './services/users/user.controller';
import { TaskController } from './services/tasks/task.controller';
import { CheckAuthGuard } from './shared/guards/check-auth-guard';


@Module({
  imports: [
    ConfigGatewayModule,
    HttpModule.registerAsync({
      imports: [ConfigGatewayModule],
      useFactory: async (config: ConfigService) => ({
        timeout: config.getOrThrow<number>('gateway.httpTimeout'),
        maxRedirects: config.getOrThrow<number>('gateway.redirectsCount')
      }),
      inject: [ConfigService]
    })],
  controllers:[
    AuthenticationController,
    UserController,
    FeedbackController,
    ReplyController,
    StaticController,
    CategoryController,
    TaskController,
    ReplyController
  ],
  providers: [CheckAuthGuard],
})
export class AppModule {}
