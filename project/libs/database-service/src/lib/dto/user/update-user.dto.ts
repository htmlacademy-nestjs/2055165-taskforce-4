import { City } from "@project/shared/app-types";
import { ArrayMaxSize, ArrayMinSize, IsDateString, IsEnum, IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ABOUT_INFO_LENGTH, NAME_LENGTH, PASSWORD_LENGTH, SPECIALIZATION_COUNT } from "../user/validation-constants";

export class UpdateUserDTO {

  @IsOptional()
  @MinLength(NAME_LENGTH.MIN)
  @MaxLength(NAME_LENGTH.MAX)
  public name?: string;

  @IsOptional()
  @MinLength(PASSWORD_LENGTH.MIN)
  @MaxLength(PASSWORD_LENGTH.MAX)
  public password?: string;

  @IsOptional()
  @MinLength(PASSWORD_LENGTH.MIN)
  @MaxLength(PASSWORD_LENGTH.MAX)
  public newPassword?: string;

  @IsOptional()
  @MaxLength(ABOUT_INFO_LENGTH.MAX)
  public aboutInfo?: string;

  @IsOptional()
  @IsDateString({strict: true})
  birthDate?: string;

  @IsOptional()
  @IsMongoId()
  public avatar?: string;

  @IsOptional()
  @ArrayMinSize(SPECIALIZATION_COUNT.MIN)
  @ArrayMaxSize(SPECIALIZATION_COUNT.MAX)
  @IsString({each:true})
  @IsNotEmpty({each: true})
  public specialization?: string[];

  @IsOptional()
  @IsEnum(City)
  public city?: City;
}
