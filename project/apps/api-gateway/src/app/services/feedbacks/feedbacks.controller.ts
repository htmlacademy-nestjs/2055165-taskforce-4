import { Body, Controller, Delete, Param, Post, UseGuards, UseInterceptors } from "@nestjs/common";
import { CheckAuthGuard } from "../../shared/guards/check-auth-guard";
import { UserIdAndRoleRoleInterceptor } from "../../shared/interceptors/user-id-role.interceptor";
import CreateCommentDTO from "./dto/create-comment.dto";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import CommentRDO from "./rdo/comment.rdo";
import UserFullRDO from "../authentication/rdo/user-full.rdo";
import {fillRDO} from '@project/util/util-core'
import CommentFullRDO from "./rdo/comment-full.rdo";
import UserBasicRDO from "../authentication/rdo/user-basic.rdo";
import DeleteCommentDTO from "./dto/delete-comment.dto";


@Controller('feedbacks')
@UseGuards(CheckAuthGuard)
export class FeedbacksController {
  private baseFeedbacksUrl: string;
  private baseUsersUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.baseFeedbacksUrl = this.configService.getOrThrow<string>('gateway.serviceURLs.feedbacks');
    this.baseUsersUrl = this.configService.getOrThrow<string>('gateway.serviceURLs.users');
  }

  @Post('/comment/create')
  @UseInterceptors(UserIdAndRoleRoleInterceptor)
  public async createComment(@Body() dto: CreateCommentDTO) {
    const {data: newComment} = await this.httpService.axiosRef.post<CommentRDO>(`${this.baseFeedbacksUrl}/comment/create`, dto);
    const {data: author} = await this.httpService.axiosRef.get<UserBasicRDO>(`${this.baseUsersUrl}/${newComment.authorId}`)
    return fillRDO(CommentFullRDO, {...newComment, author}, [author.role]);
  }


  @Delete('/comment/delete')
  @UseInterceptors(UserIdAndRoleRoleInterceptor)
  public async deleteComment(@Body() {commentId, userId}: DeleteCommentDTO) {
    await this.httpService.axiosRef.delete(`${this.baseFeedbacksUrl}/comment/delete/`, {data: {commentId, userId}})
    return 'OK'
  }
}
