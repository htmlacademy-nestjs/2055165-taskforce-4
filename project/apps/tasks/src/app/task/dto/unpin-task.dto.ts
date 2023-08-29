import { IsInt, IsPositive } from "class-validator";

export default class UnpinTaskDTO {
  @IsInt()
  @IsPositive()
  public pinId!: number;
}
