import { Injectable } from '@nestjs/common';

import { CRUDRepository } from '@project/util/util-types';
import { Comment } from '@project/shared/app-types';
import { CommentEntity } from '../entities/comment.entity';

@Injectable()
export class CommentMemoryRepository implements CRUDRepository<CommentEntity, undefined, Comment> {

  private repository: Record<string, Comment> = {};

  public async findById(commentId: string): Promise<Comment | null> {
    if (! this.repository[commentId]) {
      return null
    }

    return {...this.repository[commentId]};
  }

  public async getCommentsByTaskId(taskId: string): Promise<Comment[]> {
    return Object.values(this.repository).filter((comment) => comment.taskId === taskId);
  }


  public async create(item: CommentEntity): Promise<Comment> {
    const entry = item.toObject();
    this.repository[item.id] = entry;

    return entry;
  }

  public async update(): Promise<Comment> {
    throw new Error('Method not implemented.');
  }


  public async delete(commentId: string): Promise<void> {
    delete this.repository[commentId];
  }

}
