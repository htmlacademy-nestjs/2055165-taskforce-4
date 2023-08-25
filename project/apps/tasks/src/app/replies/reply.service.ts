import { BadRequestException, Injectable } from '@nestjs/common';

import { ReplyEntity, ReplyRepository } from '@project/database-service';
import CreateReplyDTO from './dto/create-reply.dto';
import { TaskService } from '../task/task.service';
import DeleteReplyDTO from './dto/delete-reply.dto';

@Injectable()
export class ReplyService {
  constructor(
    private readonly replyRepository: ReplyRepository,
    private readonly taskService: TaskService
  ){}

  public async createReply(dto: CreateReplyDTO) {
    const task = await this.taskService.getTaskDetails(dto.taskId);
    if (!task) {
      throw new BadRequestException('Task not found');
    }

    return this.replyRepository.create(new ReplyEntity({...dto, task}));
  }


  public async getTaskReplies(taskId: number) {
    const task = await this.taskService.getTaskDetails(taskId);

    if (!task) {
      throw new BadRequestException('Task not found.');
    }

    return this.replyRepository.getByTaskId(taskId);
  }


  public async deleteReply(dto: DeleteReplyDTO) {
    const {taskId, replyId} = dto;

    await this.replyRepository.delete(replyId);
    return this.getTaskReplies(taskId);
  }
}
