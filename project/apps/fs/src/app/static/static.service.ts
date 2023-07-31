import { Injectable } from '@nestjs/common';

@Injectable()
export class StaticService {
  public async uploadFile(file: string) {
    console.log(file);
    throw new Error('not implemented');
  }

  public async getFile(fileId: string) {
    console.log(fileId);
    throw new Error('not implemented');
  }
}
