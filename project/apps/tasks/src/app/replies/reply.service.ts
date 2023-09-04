import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';

import { ReplyEntity, ReplyRepository, TaskRepository } from '@project/database-service';
import CreateReplyDTO from './dto/create-reply.dto';
import DeleteReplyDTO from './dto/delete-reply.dto';
import { TaskStatus } from '@project/shared/app-types';

@Injectable()
export class ReplyService {
  constructor(
    private readonly replyRepository: ReplyRepository,
    private readonly taskRepository: TaskRepository
  ){}

  public async createReply(dto: CreateReplyDTO) {
    const {taskId, executorId, text} = dto;

    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new BadRequestException('Task not found');
    }

    const existReply = await this.replyRepository.find(taskId, executorId);
    if (existReply) {
      throw new ConflictException('The executor has already replied on this task.')
    }

    if (task.status !== TaskStatus.New) {
      throw new ConflictException('This task has already pinned to another executor.')
    }


    const newReply = await this.replyRepository.create(new ReplyEntity({executorId, text, task}));
    await this.taskRepository.update(task.taskId, {repliesCount: ++task.repliesCount});
    return newReply;
  }


  public async deleteReply(dto: DeleteReplyDTO) {
    const {taskId, executorId} = dto;

    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new BadRequestException('Task not found');
    }

    await this.replyRepository.delete(taskId, executorId);
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
