import { Injectable } from "@nestjs/common";

import { CRUDRepository } from "@project/util/util-types";
import { FeedbackEntity } from "../entities/feedback.entity";
import { Feedback } from "@project/shared/app-types";
import { DatabaseService } from "../prisma/database.service";
import { FeedbackQuery } from "../queries/feedback/feedback.query";

@Injectable()
export class FeedbackRepository implements CRUDRepository<FeedbackEntity, string, Feedback> {
  private prisma;
  constructor (dbService: DatabaseService) {
    this.prisma = dbService.prismaBaseMongoConnector
  }

  public async findById(feedbackId: string): Promise<Feedback | null> {
    return this.prisma.feedBack.findUnique({
      where: {feedbackId},
      include: {employer: true}
    })
  }


  public async findByExecutorId(executorId: string, {limit, page}: FeedbackQuery): Promise<Feedback[]> {
    return this.prisma.feedBack.findMany({
      where: {executorId},
      take: limit,
      include: {employer: true},
      skip: page && page > 0 ? limit * (page - 1) : undefined
    })
  }


  public async create(item: FeedbackEntity): Promise<Feedback> {
    const feedbackData = item.toObject();
    return this.prisma.feedBack.create({
      data: {
        ...feedbackData,
        employer: {
          connect: {id: feedbackData.employer.id}
        }
      },
      include: {employer: true}
    })
  }


  public async update(): Promise<Feedback> {
    throw new Error("Method not implemented.");
  }


  public async delete(feedbackId: string) {
    await this.prisma.feedBack.delete({
      where: {feedbackId}
    })
  }

}
