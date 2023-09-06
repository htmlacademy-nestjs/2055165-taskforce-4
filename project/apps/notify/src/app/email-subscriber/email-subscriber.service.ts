import { Injectable } from '@nestjs/common';

import { EmailSubscriberEntity, EmailSubscriberRepository } from '@project/database-service';
import { CreateSubscriberDTO } from './dto/create-subscriber.dto';

@Injectable()
export class EmailSubscriberService {
  constructor(
    private readonly emailSubscriberRepository: EmailSubscriberRepository
  ) {}

  public async addSubscriber(subscriber: CreateSubscriberDTO) {
    const { email } = subscriber;
    const existsSubscriber = await this.emailSubscriberRepository.findByEmail(email);

    if (existsSubscriber) {
      return existsSubscriber;
    }

    return this.emailSubscriberRepository
      .create(new EmailSubscriberEntity(subscriber));
  }
}
