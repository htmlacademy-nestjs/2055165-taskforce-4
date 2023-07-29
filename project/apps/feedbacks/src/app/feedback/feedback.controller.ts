import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { CommentService } from '../comment/comment.service';
import { FeedbackService } from './feedback.service';
import CreateCommentDTO from '../comment/dto/create-comment.dto';
import {fillRDO} from '@project/util/util-core'
import CommentRDO from '../comment/rdo/comment.rdo';
import CreateFeedbackDTO from './dto/create-feedback.dto';
import FeedbackRDO from './rdo/feedback.rdo';

@Controller('feedbacks')
export class FeedbackController {
  constructor(
    private readonly commentService: CommentService,
    private readonly feedbackService: FeedbackService
  ) {}


  @Post('/create')
  public async createComment(@Body() dto: CreateCommentDTO) {
    const newComment = await this.commentService.createComment(dto);
    return fillRDO(CommentRDO, newComment);
  }



  @Post('/delete')
  public async deleteComment(@Body('commentId') commentId: string) {
    await this.commentService.deleteComment(commentId)
    return 'OK'
  }


  @Get()
  public async getComments(@Param('taskId') taskId: string) {
    await this.commentService.getTaskComments(taskId);
  }

  @Post()
  public async createFeedback(@Body() dto: CreateFeedbackDTO, @Param('employer_only') isEmployer: boolean) {
    if (!isEmployer) {
      throw new Error('wrong parameter');
    }

    const newFeedBack = await this.feedbackService.createFeedBack(dto);
    return fillRDO(FeedbackRDO, newFeedBack);
  }


}
