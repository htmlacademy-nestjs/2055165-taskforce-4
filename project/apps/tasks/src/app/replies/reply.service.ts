import { BadRequestException, Injectable } from '@nestjs/common';

import { ReplyEntity, ReplyRepository, TaskRepository } from '@project/database-service';
import CreateReplyDTO from './dto/create-reply.dto';

@Injectable()
export class ReplyService {
  constructor(
    private readonly replyRepository: ReplyRepository,
    private readonly taskRepository: TaskRepository
  ){}

  public async createReply(dto: CreateReplyDTO, executorId: string) {
    const {taskId, text} = dto;

    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    const newReply = await this.replyRepository.create(new ReplyEntity({executorId, text, task}));
    await this.taskRepository.update(task.taskId, {repliesCount: ++task.repliesCount});
    return newReply;
  }


  public async deleteReply(taskId: number, executorId: string) {

    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new BadRequestException('Task not found');
    }

    await this.replyRepository.delete(taskId, executorId)
      .catch(() => {throw new BadRequestException('This executor didn\'t reply on this task.')}
    );

    await this.taskRepository.update(taskId, {repliesCount: --task.repliesCount})
  }


  public async getTaskReplies(taskId: number) {
    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new BadRequestException('Task not found.');
    }

    return this.replyRepository.findAllByTaskId(taskId);
  }
}
