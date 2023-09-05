import { EmailSubscriber } from "@project/shared/app-types";

export class EmailSubscriberEntity implements Omit<EmailSubscriber, 'id'> {
  public email!: string;
  public name!: string;

  constructor(subscriber: Omit<EmailSubscriber, 'id'>) {
    this.fillEntity(subscriber);
  }


  public fillEntity(subscriber: Omit<EmailSubscriber, 'id'>) {
    this.email = subscriber.email;
    this.name = subscriber.name;

  }


  public toObject() {
    return {
      email: this.email,
      name: this.name,
    }
  }
}
