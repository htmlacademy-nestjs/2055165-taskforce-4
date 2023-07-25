export interface FeedBack {
  id: string;
  text: string;
  taskId: string;
  authorId: string;
  executorId: string; //как лучше сделать?
  rating: number;
}
