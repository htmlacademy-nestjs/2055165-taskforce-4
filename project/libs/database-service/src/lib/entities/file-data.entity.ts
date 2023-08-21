import { FileData } from "@project/shared/app-types";

export class FileDataEntity implements Omit<FileData, 'id'> {
  originalName!: string;
  size!: number;
  mimetype!: string;
  hashName!: string;
  path!: string;

  constructor(file: Omit<FileData, 'id'>) {
    this.fillEntity(file);
  }

  public fillEntity(file: Omit<FileData, 'id'>) {
    this.originalName = file.originalName;
    this.size = file.size;
    this.mimetype = file.mimetype;
    this.hashName = file.hashName;
    this.path = file.path;
  }

  public toObject(): Omit<FileData, 'id'> {
    return {
      originalName: this.originalName,
      size: this.size,
      mimetype: this.mimetype,
      hashName: this.hashName,
      path: this.path
    }
  }
}
