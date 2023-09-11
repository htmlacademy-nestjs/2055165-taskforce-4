import { Body, Controller, Delete, Get, Post, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { CheckAuthGuard } from "../../shared/guards/check-auth-guard";
import { UserIdAndRoleInterceptor } from "../../shared/interceptors/user-id-role.interceptor";
import CreateCommentDTO from "./dto/create-comment.dto";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import DeleteCommentDTO from "./dto/delete-comment.dto";
import { CommentQuery, FeedbackQuery } from '@project/database-service';
import CreateFeedbackDTO from "./dto/create-feedback.dto";
import DeleteFeedbackDTO from "./dto/delete-feedback.dto";


@Controller('feedbacks')
@UseGuards(CheckAuthGuard)
export class FeedbacksController {
  private baseFeedbacksUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.baseFeedbacksUrl = this.configService.getOrThrow<string>('gateway.serviceURLs.feedbacks');
  }

  @Post('/comment/create')
  @UseInterceptors(UserIdAndRoleInterceptor)
  public async createComment(@Body() dto: CreateCommentDTO) {
    const {data: newComment} = await this.httpService.axiosRef.post(`${this.baseFeedbacksUrl}/comment/create`, dto);
    return newComment;
  }


  @Delete('/comment/delete')
  @UseInterceptors(UserIdAndRoleInterceptor)
  public async deleteComment(@Body() {commentId, userId}: DeleteCommentDTO) {
    await this.httpService.axiosRef.delete(`${this.baseFeedbacksUrl}/comment/delete/`, {data: {commentId, userId}})
    return 'OK'
  }


  @Get('/comment')
  public async getTaskComments(@Query() {taskId, page, limit}: CommentQuery) {
    const limitQuery = limit ? `&limit=${limit}` : '';
    const pageQuery = page ? `&page=${page}` : '';

    const {data: comments} = await this.httpService.axiosRef.get(`${this.baseFeedbacksUrl}/comment?taskId=${taskId}${limitQuery}${pageQuery}`);
    return comments;
  }


  @Post('/feedback/create')
  @UseInterceptors(UserIdAndRoleInterceptor)
  public async createFeedback(@Body() dto: CreateFeedbackDTO) {
      const {data: newFeedback} = await this.httpService.axiosRef.post(`${this.baseFeedbacksUrl}/feedback/create`, dto);
      return newFeedback
  }


  @Delete('/feedback/delete')
  @UseInterceptors(UserIdAndRoleInterceptor)
  public async deleteFeedback(@Body() dto: DeleteFeedbackDTO) {
    await this.httpService.axiosRef.delete(`${this.baseFeedbacksUrl}/feedback/delete`, {data: dto})
    return 'OK'
  }


  @Get('/feedback')
  public async getExecutorFeedbacks(@Query() {executorId, limit, page}: FeedbackQuery) {
    const limitQuery = limit ? `&limit=${limit}` : '';
    const pageQuery = page ? `&page=${page}` : '';

    const {data:feedbacks} = await this.httpService.axiosRef.get(`${this.baseFeedbacksUrl}/feedback?executorId=${executorId}${limitQuery}${pageQuery}`)
    return feedbacks
  }
}
