import { HttpService } from '@nestjs/axios';
import { Body, Controller, Delete, Get, Param, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CheckAuthGuard } from '../../shared/guards/check-auth-guard';
import { UserIdAndRoleInterceptor } from '../../shared/interceptors/user-id-role.interceptor';
import CreateReplyDTO from './dto/create-reply.dto';
import DeleteReplyDTO from './dto/delete-reply.dto'

@Controller('replies')
@UseGuards(CheckAuthGuard)
export class ReplyController {
  private baseRepliesUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.baseRepliesUrl = this.configService.getOrThrow<string>('gateway.serviceURLs.replies');
  }

  @Post('/create')
  @UseInterceptors(UserIdAndRoleInterceptor)
  public async createReply(@Body() dto: CreateReplyDTO) {
    const {data: newReply} = await this.httpService.axiosRef.post(`${this.baseRepliesUrl}/create`, dto);
    return newReply
  }


  @Get('/:taskId')
  public async getTaskReplies(@Param('taskId') taskId: string) {
    const {data: taskReplies} = await this.httpService.axiosRef.get(`${this.baseRepliesUrl}/${taskId}`);
    return taskReplies
  }


  @Delete('/delete')
  @UseInterceptors(UserIdAndRoleInterceptor)
  public async deleteReply(@Body() dto: DeleteReplyDTO) {
    await this.httpService.axiosRef.delete(`${this.baseRepliesUrl}/delete`, {data: dto});
  }
}
