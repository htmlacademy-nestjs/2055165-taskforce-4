export default class CreateReplyDTO {
  public text!: string;
  public taskId!: string; //Нужно ли? Если taskId передается в Url params
  public executorId!: string;
}
