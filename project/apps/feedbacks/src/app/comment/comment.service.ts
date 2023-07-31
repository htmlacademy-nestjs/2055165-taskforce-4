import { randomUUID } from 'node:crypto';

import { Injectable } from '@nestjs/common';

import {Comment} from '@project/shared/app-types';
import {CommentMemoryRepository, CommentEntity} from '@project/database-service';
import CreateCommentDTO from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentMemoryRepository
  ) {}

  public async createComment(dto: CreateCommentDTO) {
    const {text, taskId, authorId} = dto;

    const newComment: Comment = {
      id: randomUUID(),
      text,
      taskId,
      authorId,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    return this.commentRepository.create(new CommentEntity(newComment));
  }


  public async getTaskComments(taskId: string) {
    return this.commentRepository.getCommentsByTaskId(taskId);
  }

  public async deleteComment(commentId: string) {
    return this.commentRepository.delete(commentId);
  }
}
