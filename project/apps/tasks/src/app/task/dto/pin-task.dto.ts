import { IsMongoId } from "class-validator";

export default class PinTaskDTO {
  @IsMongoId()
  public executorId!: string;
}
