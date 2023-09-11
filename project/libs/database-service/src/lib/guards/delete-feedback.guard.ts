import { CanActivate, ExecutionContext, ForbiddenException, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Request } from "express";
import { DatabaseService } from "../prisma/database.service";

@Injectable()
export class DeleteFeedbackGuard implements CanActivate {
  private prisma;
  constructor(
    @Inject(DatabaseService) private readonly dbService: DatabaseService
  ){
    this.prisma = dbService.prismaBaseMongoConnector;
  }

  async canActivate(cxt: ExecutionContext) {
    const {body: {feedbackId, userId}} = cxt.switchToHttp().getRequest<Request>();

    const feedBack = await this.prisma.feedBack.findUnique({
      where: {feedbackId}
    });

    await this.prisma.$disconnect();

    if (!feedBack) throw new NotFoundException('Feedback not found');

    if (feedBack.employerId !== userId) throw new ForbiddenException(`Permission denied. You aren'\t author of this feedback`)

    return true;
  }
}
