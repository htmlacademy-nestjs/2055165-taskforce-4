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
    const {taskId, text, userId} = dto;

    const task = await this.taskRepository.findById(taskId);

    if (!task) {
      throw new BadRequestException('Task not found');
    }

    const newReply = await this.replyRepository.create(new ReplyEntity({executorId: userId, text, task}));
    await this.taskRepository.update(task.taskId, {repliesCount: ++task.repliesCount});
    return newReply;
  }


  public async deleteReply({taskId, userId}: DeleteReplyDTO) {

    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new BadRequestException('Task not found');
    }

    await this.replyRepository.delete(taskId, userId)
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
