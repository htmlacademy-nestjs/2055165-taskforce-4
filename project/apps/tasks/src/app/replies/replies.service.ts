import { randomUUID } from 'node:crypto';


import { Injectable } from '@nestjs/common';
import { ReplyEntity } from '@project/database-service';
import CreateReplyDTO from './dto/create-reply.dto';
import { Reply } from '@project/shared/app-types';

@Injectable()
export class RepliesService {


  // public async createReply(dto: CreateReplyDTO) {
  //   const {text, taskId, executorId} = dto

  //   const newReply: Reply = {
  //     id: randomUUID(),
  //     text,
  //     taskId,
  //     executorId,
  //     createdAt: new Date(),
  //     updatedAt: new Date()
  //   }

  //   return this.taskRepository.createReply(new ReplyEntity(newReply));
  // }


  // public async getTaskReplies(taskId: string) {
  //   return this.taskRepository.getRepliesByTaskId(taskId);
  // }

  // public async deleteReply(replyId: string) {
  //   return this.taskRepository.deleteReply(replyId);
  // }
}
