import { City } from "@project/shared/app-types";

export default class CreateTaskDTO {
  public title!: string;
  public description!: string;
  public categoryId!: number;
  public price!: number;
  public expirationDate?: Date;
  public image?: string;
  public address?: string;
  public tags?: string[];
  public city!: City;
}


