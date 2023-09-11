import { Body, Controller, Delete, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { CommentService } from '../comment/comment.service';
import { FeedbackService } from './feedback.service';
import CreateCommentDTO from '../comment/dto/create-comment.dto';
import {fillRDO} from '@project/util/util-core'
import CommentRDO from '../comment/rdo/comment.rdo';
import CreateFeedbackDTO from './dto/create-feedback.dto';
import FeedbackRDO from './rdo/feedback.rdo';
import DeleteCommentDTO from '../comment/dto/delete-comment.dto';
import { CommentQuery, CreateFeedbackGuard, DeleteCommentGuard, DeleteFeedbackGuard, FeedbackQuery, RoleGuard, Roles } from '@project/database-service';
import DeleteFeedbackDTO from './dto/delete-feedback.dto';
import { UserRole } from '@project/shared/app-types';

@Controller('feedbacks')
@UsePipes(new ValidationPipe({whitelist: true, transform: true}))
export class FeedbackController {
  constructor(
    private readonly commentService: CommentService,
    private readonly feedbackService: FeedbackService
  ) {}


  @Post('/comment/create')
  public async createComment(@Body() dto: CreateCommentDTO) {
    const newComment = await this.commentService.createComment(dto);
    return fillRDO(CommentRDO, newComment);
  }


  @Delete('/comment/delete')
  @UseGuards(DeleteCommentGuard)
  public async deleteComment(@Body() {commentId}: DeleteCommentDTO) {
    await this.commentService.deleteComment(commentId)
    return 'OK'
  }


  @Get('/comment')
  public async getTaskComments(@Query() query: CommentQuery) {
    const comments = await this.commentService.getTaskComments(query);
    return fillRDO(CommentRDO, comments)
  }


  @Post('/feedback/create')
  @Roles(UserRole.Employer)
  @UseGuards(RoleGuard, CreateFeedbackGuard)
  public async createFeedback(@Body() dto: CreateFeedbackDTO) {
    const newFeedBack = await this.feedbackService.createFeedBack(dto);
    return fillRDO(FeedbackRDO, newFeedBack);
  }


  @Delete('/feedback/delete')
  @Roles(UserRole.Employer)
  @UseGuards(RoleGuard, DeleteFeedbackGuard)
  public async deleteFeedback(@Body() {feedbackId}: DeleteFeedbackDTO) {
    await this.feedbackService.deleteFeedback(feedbackId)
    return 'OK'
  }


  @Get('/feedback')
  public async getExecutorFeedbacks(
    @Query(new ValidationPipe({transform: true, whitelist: true})) query: FeedbackQuery,
    ) {
      const feedbacks = await this.feedbackService.getExecutorFeedbacks(query);
      return fillRDO(FeedbackRDO, feedbacks)
  }


  @Get('/feedback/executors-stats')
  public async getExecutorRatingStats(){
    return this.feedbackService.getExecutorRatingStats();
  }
}
