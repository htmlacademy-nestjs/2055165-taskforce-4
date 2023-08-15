import { Expose } from "class-transformer";

export class CategoryRDO {
  @Expose()
  public categoryId!: number;

  @Expose()
  public title!: string;
}
