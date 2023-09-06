import { Injectable } from '@nestjs/common';

import { EmailSubscriber } from '@project/shared/app-types';
import { DatabaseService } from '../prisma/database.service';
import { EmailSubscriberEntity } from '../entities/email-subscriber.entity';

@Injectable()
export class EmailSubscriberRepository {
  private prisma;
  constructor(private readonly dbService: DatabaseService) {
    this.prisma = dbService.prismaNotifyMongoConnector;
  }

  public async create(item: EmailSubscriberEntity): Promise<EmailSubscriber> {
    const data = item.toObject();
    return this.prisma.emailSubScriber.create({
      data
    })
  }


  public async findById(id: string): Promise<EmailSubscriber | null> {
    return this.prisma.emailSubScriber.findUnique({
      where: {id}
    })
  }


  public async findByEmail(email: string): Promise<EmailSubscriber | null> {
    return this.prisma.emailSubScriber.findUnique({
      where: {email}
    })
  }

  public async delete(id: string) {
    return this.prisma.emailSubScriber.delete({
      where: {id}
    })
  }
}
