import { writeFile } from 'node:fs/promises';

import { ensureDir } from 'fs-extra';
import dayjs from 'dayjs';
import { extension } from 'mime';

import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {FileDataEntity, FileDataRepository} from '@project/database-service'

type WritedFile = {
  hashName: string;
  fileExtension?: string;
  subDirectory: string;
  path: string;
}


@Injectable()
export class StaticService {
  constructor(
    private readonly configService: ConfigService,
    private readonly fileDataRepository: FileDataRepository
  ) {}


  private async writeFile(file: Express.Multer.File): Promise<WritedFile> {
    const uploadDirectory = this.configService.get('fs-application.uploadDirectory');

    const filename = crypto.randomUUID();
    const fileExtension = extension(file.mimetype);
    const hashName = `${filename}.${fileExtension}`;

    const [ currentYear, currentMonth ] = dayjs().format('YYYY MM').split(' ');
    const subDirectory = `${currentYear}/${currentMonth}`;
    const uploadPath = `${uploadDirectory}/${subDirectory}`;

    const destinationFile = `${uploadPath}/${hashName}`;

    await ensureDir(uploadPath);
    await writeFile(destinationFile, file.buffer)
    .catch((err) => {
      throw new Error(`[Static service]: Can'\t upload ${file.originalname} cause: ${err}`)
    });


    return {
      hashName,
      fileExtension,
      subDirectory,
      path: `/${subDirectory}/${hashName}`
    }
  }

  public async uploadFile(file: Express.Multer.File) {
    const writedFile = await this.writeFile(file);
    const fileData = new FileDataEntity({
      size: file.size,
      mimetype: file.mimetype,
      originalName: file.originalname,
      path: writedFile.path,
      hashName: writedFile.hashName
    });

    return this.fileDataRepository.create(fileData);
  }




  public async getFile(fileId: string) {
    const existFile = await this.fileDataRepository.findById(fileId);

    if (!existFile) {
      throw new NotFoundException(`File with such id not found.`);
    }

    return existFile;
  }
}
