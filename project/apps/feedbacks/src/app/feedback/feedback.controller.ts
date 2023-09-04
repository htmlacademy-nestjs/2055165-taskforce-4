import { Body, Controller, Delete, Get, Post, Query, ValidationPipe } from '@nestjs/common';

import { CommentService } from '../comment/comment.service';
import { FeedbackService } from './feedback.service';
import CreateCommentDTO from '../comment/dto/create-comment.dto';
import {fillRDO} from '@project/util/util-core'
import CommentRDO from '../comment/rdo/comment.rdo';
import CreateFeedbackDTO from './dto/create-feedback.dto';
import FeedbackRDO from './rdo/feedback.rdo';
import DeleteCommentDTO from '../comment/dto/delete-comment.dto';
import { FeedbackQuery } from '@project/database-service';
import { GetTaskCommentsDTO } from '../comment/dto/get-task-comments.dto';
import DeleteFeedbackDTO from './dto/delete-feedback.dto';
import { GetExecutorFeedbacksDTO } from './dto/get-executor-feedbacks.dto';

@Controller('feedbacks')
export class FeedbackController {
  constructor(
    private readonly commentService: CommentService,
    private readonly feedbackService: FeedbackService
  ) {}


  @Post('/comment/create')
  public async createComment(@Body(new ValidationPipe({whitelist: true, transform: true})) dto: CreateCommentDTO) {
    const newComment = await this.commentService.createComment(dto);
    return fillRDO(CommentRDO, newComment);
  }


  @Delete('/comment/delete')
  public async deleteComment(@Body(new ValidationPipe({whitelist: true})) {commentId}: DeleteCommentDTO) {
    await this.commentService.deleteComment(commentId)
    return 'OK'
  }


  @Get('/comment')
  public async getTaskComments(
    @Query(new ValidationPipe({transform: true, whitelist: true})) query: FeedbackQuery,
    @Body(new ValidationPipe({transform: true, whitelist: true})) {taskId}: GetTaskCommentsDTO
    ) {

      const comments = await this.commentService.getTaskComments(taskId, query);
      return fillRDO(CommentRDO, comments)
  }


  @Post('/feedback/create')
  public async createFeedback(@Body(new ValidationPipe({whitelist: true, transform: true})) dto: CreateFeedbackDTO) {
    const newFeedBack = await this.feedbackService.createFeedBack(dto);
    return fillRDO(FeedbackRDO, newFeedBack);
  }


  @Delete('/feedback/delete')
  public async deleteFeedback(@Body(new ValidationPipe({whitelist: true})) {feedbackId}: DeleteFeedbackDTO) {
    await this.feedbackService.deleteFeedback(feedbackId)
    return 'OK'
  }


  @Get('/feedback')
  public async getExecutorFeedbacks(
    @Query(new ValidationPipe({transform: true, whitelist: true})) query: FeedbackQuery,
    @Body(new ValidationPipe({transform: true, whitelist: true})) {executorId}: GetExecutorFeedbacksDTO
    ) {

      const comments = await this.feedbackService.getExecutorFeedbacks(executorId, query);
      return fillRDO(CommentRDO, comments)
  }




}
