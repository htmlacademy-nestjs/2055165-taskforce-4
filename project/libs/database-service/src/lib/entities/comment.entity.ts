import {Comment, User} from '@project/shared/app-types'

export class CommentEntity implements Omit<Comment,'commentId'> {
  text!: string;
  taskId!: number;
  author!: User;

  constructor (comment: Omit<Comment,'commentId'>) {
    this.fillEntity(comment);
  }


  public fillEntity(comment: Omit<Comment,'commentId'>) {
    this.text = comment.text;
    this.taskId = comment.taskId;
    this.author = comment.author;
  }


  public toObject() {
    return {
      text: this.text,
      taskId: this.taskId,
      author: this.author,
    }
  }

}
