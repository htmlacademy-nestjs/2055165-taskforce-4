import { Body, Controller, Delete, Get, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';

import { CommentService } from '../comment/comment.service';
import { FeedbackService } from './feedback.service';
import CreateCommentDTO from '../comment/dto/create-comment.dto';
import {fillRDO} from '@project/util/util-core'
import CommentRDO from '../comment/rdo/comment.rdo';
import CreateFeedbackDTO from './dto/create-feedback.dto';
import FeedbackRDO from './rdo/feedback.rdo';
import DeleteCommentDTO from '../comment/dto/delete-comment.dto';
import { AuthUser, CreateFeedbackGuard, DeleteCommentGuard, FeedbackQuery, JwtAuthGuard, RoleGuard, Roles } from '@project/database-service';
import { GetTaskCommentsDTO } from '../comment/dto/get-task-comments.dto';
import DeleteFeedbackDTO from './dto/delete-feedback.dto';
import { UserRole } from '@project/shared/app-types';

@Controller('feedbacks')
@UsePipes(ValidationPipe)
export class FeedbackController {
  constructor(
    private readonly commentService: CommentService,
    private readonly feedbackService: FeedbackService
  ) {}


  @Post('/comment/create')
  @UseGuards(JwtAuthGuard)
  public async createComment(
    @AuthUser('sub') authorId: string,
    @Body(new ValidationPipe({whitelist: true, transform: true})) dto: CreateCommentDTO
    ) {
    const newComment = await this.commentService.createComment(dto, authorId);
    return fillRDO(CommentRDO, newComment);
  }


  @Delete('/comment/delete')
  @UseGuards(JwtAuthGuard)
  @UseGuards(DeleteCommentGuard)
  public async deleteComment(@Body(new ValidationPipe({whitelist: true})) {commentId}: DeleteCommentDTO) {
    await this.commentService.deleteComment(commentId)
    return 'OK'
  }


  @Get('/comment')
  @UseGuards(JwtAuthGuard)
  public async getTaskComments(
    @Query(new ValidationPipe({transform: true, whitelist: true})) query: FeedbackQuery,
    @Body(new ValidationPipe({transform: true, whitelist: true})) {taskId}: GetTaskCommentsDTO
    ) {

      const comments = await this.commentService.getTaskComments(taskId, query);
      return fillRDO(CommentRDO, comments)
  }


  @Post('/feedback/create')
  @Roles(UserRole.Employer)
  @UseGuards(JwtAuthGuard, RoleGuard, CreateFeedbackGuard)
  public async createFeedback(
    @AuthUser('sub') employerId: string,
    @Body() dto: CreateFeedbackDTO) {
    const newFeedBack = await this.feedbackService.createFeedBack(dto, employerId);
    return fillRDO(FeedbackRDO, newFeedBack);
  }


  @Delete('/feedback/delete')
  @Roles(UserRole.Employer)
  @UseGuards(JwtAuthGuard, RoleGuard)
  public async deleteFeedback(@Body(new ValidationPipe({whitelist: true})) {feedbackId}: DeleteFeedbackDTO) {
    await this.feedbackService.deleteFeedback(feedbackId)
    return 'OK'
  }


  @Get('/feedback')
  @UseGuards(JwtAuthGuard)
  public async getExecutorFeedbacks(
    @Query(new ValidationPipe({transform: true, whitelist: true})) query: FeedbackQuery,
    ) {
      const feedbacks = await this.feedbackService.getExecutorFeedbacks(query);
      return fillRDO(CommentRDO, feedbacks)
  }


  @Get('/feedback/executors-stats')
  public async getExecutorRatingStats(){
    return this.feedbackService.getExecutorRatingStats();
  }
}
