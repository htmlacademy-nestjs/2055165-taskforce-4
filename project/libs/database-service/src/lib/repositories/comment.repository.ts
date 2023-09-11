import { Injectable } from '@nestjs/common';

import { CRUDRepository } from '@project/util/util-types';
import { Comment } from '@project/shared/app-types';
import { CommentEntity } from '../entities/comment.entity';
import { DatabaseService } from '../prisma/database.service';
import { CommentQuery } from '../queries/feedback/comment.query';

@Injectable()
export class CommentRepository implements CRUDRepository<CommentEntity, string, Comment> {
  private prisma;
  constructor (private readonly DBService: DatabaseService) {
    this.prisma = DBService.prismaBaseMongoConnector
  }

  public async findById(commentId: string): Promise<Comment | null> {
    return this.prisma.comment.findUnique({
      where: {commentId},
      include: {author: true}
    })
  }


  public async getCommentsByTaskId({limit, page, taskId}: CommentQuery): Promise<Comment[]> {
    return this.prisma.comment.findMany({
      where: {taskId},
      take: limit,
      include: {author: true},
      skip: page && page > 0 ? limit * (page - 1) : undefined
    })
  }


  public async create(item: CommentEntity): Promise<Comment> {
    const commentData = item.toObject()
    return this.prisma.comment.create({
      data: {
        ...commentData,
        author: {
          connect: {id: commentData.author.id}
        }
      },
      include: { author: true }
    })
  }

  public async update(): Promise<Comment> {
    throw new Error('Method not implemented.');
  }


  public async delete(commentId: string): Promise<void> {
    await this.prisma.comment.delete({
      where: {commentId}
    })
  }

}
