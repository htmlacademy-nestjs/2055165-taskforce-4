import { Body, Controller, Delete, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { fillRDO } from '@project/util/util-core';
import { ReplyService } from './reply.service';
import CreateReplyDTO from './dto/create-reply.dto';
import ReplyRDO from './rdo/reply.rdo';
import DeleteReplyDTO from './dto/delete-reply.dto';

@Controller('replies')
@UsePipes(new ValidationPipe({whitelist: true, transform: true}))
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
    await this.replyService.deleteReply(dto);
    return 'OK';
  }
}
