import { Category } from "@project/shared/app-types";

export class CategoryEntity implements Category {
  id!: number;
  title!: string;


  constructor (categpry: Category) {
    this.fillEntity(categpry);
  }


  public fillEntity(category: Category) {
    this.id = category.id;
    this.title = category.title;
  }


  public toObject() {
    return {
      id: this.id,
      title: this.title,
    }
  }
}
