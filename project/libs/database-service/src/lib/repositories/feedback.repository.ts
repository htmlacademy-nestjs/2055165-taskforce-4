import { Injectable } from "@nestjs/common";

import { CRUDRepository } from "@project/util/util-types";
import { FeedbackEntity } from "../entities/feedback.entity";
import { Feedback, RawRatingStats } from "@project/shared/app-types";
import { DatabaseService } from "../prisma/database.service";
import { FeedbackQuery } from "../queries/feedback/feedback.query";

@Injectable()
export class FeedbackRepository implements CRUDRepository<FeedbackEntity, string, Feedback> {
  private prisma;
  constructor (private readonly dbService: DatabaseService) {
    this.prisma = dbService.prismaBaseMongoConnector
  }

  public async findById(feedbackId: string): Promise<Feedback | null> {
    return this.prisma.feedBack.findUnique({
      where: {feedbackId},
      include: {employer: true}
    })
  }


  public async findByExecutorId({executorId, limit, page}: FeedbackQuery): Promise<Feedback[]> {
    return this.prisma.feedBack.findMany({
      where: {executorId},
      take: limit,
      include: {employer: true},
      skip: page && page > 0 ? limit * (page - 1) : undefined
    })
  }


  public async getExecutorRatingStats(): Promise<RawRatingStats[]> {
    return this.prisma.feedBack.groupBy({
      by: ['executorId'],
      _sum: {
        rating: true
      },
      _count: true

    }).then((agg) =>
      agg.map((entry) => ({
        executorId: entry.executorId,
        sumRatingValue: entry._sum.rating || 0,
        feedbacksCount: entry._count
      })
    ))
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
