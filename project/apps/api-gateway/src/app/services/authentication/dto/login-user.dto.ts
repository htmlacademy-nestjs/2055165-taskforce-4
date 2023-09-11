import { IsEmail, IsEmpty, IsString } from 'class-validator';

export default class LoginUserDTO {
  @IsEmail()
  public email!: string;

  @IsString()
  @IsEmpty()
  public password!: string;
}
