import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SubscriberDTO {
  @IsEmail()
  public email!: string;

  @IsString()
  @IsNotEmpty()
  public name!: string;
}
