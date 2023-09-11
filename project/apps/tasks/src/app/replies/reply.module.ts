import { Module } from '@nestjs/common';
import { ReplyService } from './reply.service';
import { ReplyController } from './reply.controller';
import { DatabaseModule, JwtAccessStrategy, ReplyRepository, TaskRepository } from '@project/database-service';
import { ConfigAppsModule, getJwtAccessOptions } from '@project/config-service';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[
    ConfigAppsModule,
    DatabaseModule,
    JwtModule.registerAsync({
      imports: [ConfigAppsModule],
      inject: [ConfigService],
      useFactory: getJwtAccessOptions
    })
  ],
  providers: [ReplyService, ReplyRepository, TaskRepository, JwtAccessStrategy],
  controllers: [ReplyController],
})
export class ReplyModule {}
