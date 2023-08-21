import { Injectable } from '@nestjs/common';

import { FileData } from '@project/shared/app-types';
import { FileDataEntity } from '../entities/file-data.entity';
import { DatabaseService } from '../prisma/database.service';

@Injectable()
export class FileDataRepository {
  private prisma;
  constructor(private readonly dbService: DatabaseService) {
    this.prisma = dbService.prismaFsMongoConnector;
  }

  public async create(item: FileDataEntity): Promise<FileData> {
    const data = item.toObject();
    return this.prisma.fileData.create({
      data
    })
  }

  public async findById(id: string): Promise<FileData | null> {
    return this.prisma.fileData.findFirst({
      where: {
        id
      }
    })
  }
}
