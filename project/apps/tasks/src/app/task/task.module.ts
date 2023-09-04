import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { JwtModule } from '@nestjs/jwt';

import { CategoryRepository, DatabaseModule, ReplyRepository, TaskRepository } from '@project/database-service';
import { ConfigAppsModule, getJwtOptions } from '@project/config-service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports:[
    ConfigAppsModule,
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigAppsModule],
      inject: [ConfigService],
      useFactory: getJwtOptions
    })],
  providers: [TaskService, TaskRepository, CategoryRepository, ReplyRepository],
  controllers: [TaskController],
})
export class TaskModule {}
