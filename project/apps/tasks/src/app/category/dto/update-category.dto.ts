import {IsNotEmpty, IsString } from "class-validator";

export class UpdateCategoryDTO {
  @IsNotEmpty()
  @IsString()
  public title!: string;
}
