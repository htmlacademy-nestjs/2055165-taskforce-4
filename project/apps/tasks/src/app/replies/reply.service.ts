import { BadRequestException, Injectable } from '@nestjs/common';

import { ReplyEntity, ReplyRepository, TaskRepository } from '@project/database-service';
import CreateReplyDTO from './dto/create-reply.dto';
import DeleteReplyDTO from './dto/delete-reply.dto';

@Injectable()
export class ReplyService {
  constructor(
    private readonly replyRepository: ReplyRepository,
    private readonly taskRepository: TaskRepository
  ){}

  public async createReply(dto: CreateReplyDTO) {
    const task = await this.taskRepository.findById(dto.taskId);
    if (!task) {
      throw new BadRequestException('Task not found');
    }

    const newReply = await this.replyRepository.create(new ReplyEntity({...dto, task}));
    await this.taskRepository.update(task.taskId, {repliesCount: ++task.repliesCount});
    return newReply;
  }


  public async deleteReply(dto: DeleteReplyDTO) {
    const {taskId, replyId} = dto;

    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new BadRequestException('Task not found');
    }

    await this.replyRepository.delete(replyId);
    await this.taskRepository.update(taskId, {repliesCount: --task.repliesCount})
    return this.getTaskReplies(taskId);
  }


  public async getTaskReplies(taskId: number) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new BadRequestException('Task not found.');
    }

    return this.replyRepository.getByTaskId(taskId);
  }
}
