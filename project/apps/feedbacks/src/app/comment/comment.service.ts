import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import {CommentRepository, CommentEntity, UserRepository, FeedbackQuery} from '@project/database-service';
import CreateCommentDTO from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async createComment(dto: CreateCommentDTO, authorId: string) {
    const {taskId, text} = dto;

    //проверка таска на существование через брокер => сервис тасков
    //проверка юзера на существование через брокер => сервис юзеров
    const existUser = await this.userRepository.findById(authorId);
    if (!existUser) {
      throw new BadRequestException('Author with such id not found');
    }

    const commentData = {
      text,
      taskId,
      author: existUser
    }

    return this.commentRepository.create(new CommentEntity(commentData));
  }


  public async getTaskComments(taskId: number, query: FeedbackQuery) {
    //проверка таска на существование через брокер => сервис тасков
    return this.commentRepository.getCommentsByTaskId(taskId, query);
  }


  public async deleteComment(commentId: string) {
    return this.commentRepository.delete(commentId)
      .catch(() => {throw new NotFoundException('Comment not found');});
  }
}
