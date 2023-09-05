import { Body, Controller, Delete, Get, Param, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { fillRDO } from '@project/util/util-core';
import { ReplyService } from './reply.service';
import CreateReplyDTO from './dto/create-reply.dto';
import ReplyRDO from './rdo/reply.rdo';
import DeleteReplyDTO from './dto/delete-reply.dto';
import { AuthUser, CreateReplyGuard, JwtAuthGuard, RoleGuard, Roles } from '@project/database-service';
import { UserRole } from '@project/shared/app-types';

@Controller('replies')
@UsePipes(new ValidationPipe({whitelist: true, transform: true}))
@UseGuards(JwtAuthGuard)
export class ReplyController {
  constructor(
    private readonly replyService: ReplyService
  ) {}

  @Post('/create')
  @Roles(UserRole.Executor)
  @UseGuards(RoleGuard, CreateReplyGuard)
  public async createReply(
    @AuthUser('id') executorId: string,
    @Body() dto: CreateReplyDTO
    ) {

    const newReply = await this.replyService.createReply(dto, executorId);
    return fillRDO(ReplyRDO, newReply);
  }


  @Get('/:taskId')
  public async getTaskReplies(@Param('taskId') taskId: number) {
    const taskReplies = await this.replyService.getTaskReplies(taskId);
    return fillRDO(ReplyRDO, taskReplies);
  }


  @Delete('/delete')
  @Roles(UserRole.Executor)
  @UseGuards(RoleGuard)
  public async deleteReply(
    @AuthUser('id') executorId: string,
    @Body() {taskId}: DeleteReplyDTO
    ) {

    await this.replyService.deleteReply(taskId, executorId);
    return 'OK';
  }
}
