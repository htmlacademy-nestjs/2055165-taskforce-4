import {Comment} from '@project/shared/app-types'

export class CommentEntity implements Comment {
  id!: string;
  text!: string;
  taskId!: string;
  authorId!: string;
  createdAt!: Date;
  updatedAt!: Date;

  constructor (comment: Comment) {
    this.fillEntity(comment);
  }

  public fillEntity(comment: Comment) {
    this.id = comment.id;
    this.text = comment.text;
    this.taskId = comment.taskId;
    this.authorId = comment.authorId;
    this.createdAt = comment.createdAt;
    this.updatedAt = comment.updatedAt;
  }

  public toObject() {
    return {
      id: this.id,
      text: this.text,
      taskId: this.taskId,
      authorId: this.authorId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }
  }

}
