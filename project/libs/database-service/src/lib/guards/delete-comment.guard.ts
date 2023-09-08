import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { JwtService }  from "@nestjs/jwt"

import { DatabaseService } from "../prisma/database.service";
import {TokenPayload } from "@project/shared/app-types";

@Injectable()
export class DeleteCommentGuard implements CanActivate {
  private prisma;
  constructor(
    @Inject(JwtService) private readonly jwtService: JwtService,
    @Inject(DatabaseService) private readonly dbService: DatabaseService
  ){
    this.prisma = dbService.prismaBaseMongoConnector;
  }

  async canActivate(cxt: ExecutionContext) {
    const {headers, body} = cxt.switchToHttp().getRequest<Request>();
    const token = headers.authorization?.replace('Bearer', '').trim();

    if (!token) {
      throw new UnauthorizedException('Permission denied. Only for authorized users.')
    }

    const {sub: id} = this.jwtService.decode(token) as TokenPayload;
    const {commentId} = body;


    const comment = await this.prisma.comment.findUnique({
      where: {commentId}
    });

    await this.prisma.$disconnect();

    if (!comment)  throw new NotFoundException('Comment not found');

    if (comment.authorId !== id)  throw new ForbiddenException(`Permission denied. You aren'\t author of this comment`)


    return true;
  }
}
