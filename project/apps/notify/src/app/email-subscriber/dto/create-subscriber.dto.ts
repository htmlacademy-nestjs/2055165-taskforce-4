import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateSubscriberDTO {
  @IsEmail()
  public email!: string;

  @IsString()
  @IsNotEmpty()
  public name!: string;
}
