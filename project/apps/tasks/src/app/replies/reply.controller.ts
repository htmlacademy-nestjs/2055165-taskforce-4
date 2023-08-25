import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { fillRDO } from '@project/util/util-core';
import { ReplyService } from './reply.service';
import CreateReplyDTO from './dto/create-reply.dto';
import ReplyRDO from './rdo/reply.rdo';
import DeleteReplyDTO from './dto/delete-reply.dto';

@Controller('replies')
export class ReplyController {
  constructor(
    private readonly replyService: ReplyService
  ) {}

  @Post('/create')
  public async createReply(@Body() dto: CreateReplyDTO) {
    const newReply = await this.replyService.createReply(dto);
    return fillRDO(ReplyRDO, newReply);
  }

  @Get('/:taskId')
  public async getTaskReplies(@Param('taskId') taskId: number) {
    const taskReplies = await this.replyService.getTaskReplies(taskId);
    return fillRDO(ReplyRDO, taskReplies);
  }

  @Delete('/delete')
  public async deleteReply(@Body() dto: DeleteReplyDTO) {
    const remainingTaskReplies = await this.replyService.deleteReply(dto);
    return fillRDO(ReplyRDO, remainingTaskReplies);
  }
}
