import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { DatabaseService } from "../prisma/database.service";

@Injectable()
export class DeleteCommentGuard implements CanActivate {
  private prisma;
  constructor(
    @Inject(DatabaseService) private readonly dbService: DatabaseService
  ){
    this.prisma = dbService.prismaBaseMongoConnector;
  }

  async canActivate(cxt: ExecutionContext) {
    const {body: {commentId, userId}} = cxt.switchToHttp().getRequest<Request>();

    const comment = await this.prisma.comment.findUnique({
      where: {commentId}
    });

    await this.prisma.$disconnect();

    if (!comment)  throw new NotFoundException('Comment not found');

    if (comment.authorId !== userId)  throw new ForbiddenException(`Permission denied. You aren'\t author of this comment`)

    return true;
  }
}
