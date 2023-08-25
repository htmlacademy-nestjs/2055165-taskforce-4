import { IsEmail, MaxLength, MinLength } from "class-validator";

import { PASSWORD_LENGTH } from "../auth.constants";

export default class AuthUserDTO {

  @IsEmail()
  public email!: string;

  @MinLength(PASSWORD_LENGTH.MIN)
  @MaxLength(PASSWORD_LENGTH.MAX)
  public password!: string;
}
