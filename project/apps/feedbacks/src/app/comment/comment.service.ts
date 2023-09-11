import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import {CommentRepository, CommentEntity, UserRepository, CommentQuery} from '@project/database-service';
import CreateCommentDTO from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    private readonly commentRepository: CommentRepository,
    private readonly userRepository: UserRepository
  ) {}

  public async createComment({taskId, text, userId}: CreateCommentDTO) {

    const existUser = await this.userRepository.findById(userId);
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


  public async getTaskComments(query: CommentQuery) {
    return this.commentRepository.getCommentsByTaskId(query);
  }


  public async deleteComment(commentId: string) {
    return this.commentRepository.delete(commentId)
      .catch(() => {throw new NotFoundException('Comment not found');});
  }
}
