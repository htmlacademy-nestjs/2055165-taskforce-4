import { IsMongoId } from "class-validator";

export default class PinTaskDTO {
  public executorId!: string;
}
