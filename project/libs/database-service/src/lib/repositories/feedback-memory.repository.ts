import { Injectable } from "@nestjs/common";

import { CRUDRepository } from "@project/util/util-types";
import { FeedbackEntity } from "../entities/feedback.entity";
import { Feedback } from "@project/shared/app-types";

@Injectable()
export class FeedbackMemoryRepository implements CRUDRepository<FeedbackEntity, undefined, Feedback> {

  private repository: Record<string, Feedback> = {};

  public async findById(feedbackId: string) {
    if (! this.repository[feedbackId]) {
      return null
    }

    return {...this.repository[feedbackId]};
  }


  public async findByExecutorId(executorId: string): Promise<Feedback[]> {
    return [...Object.values(this.repository).filter((feedback) => feedback.executorId === executorId)];
  }


  public async create(item: FeedbackEntity) {
    const entry = item.toObject();
    this.repository[item.id] = entry;

    return entry;
  }


  public async update(): Promise<Feedback> {
    throw new Error("Method not implemented.");
  }


  public async delete(feedbackId: string) {
    delete this.repository[feedbackId];
  }

}
