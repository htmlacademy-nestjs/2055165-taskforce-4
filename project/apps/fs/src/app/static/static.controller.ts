import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import 'multer';
import { StaticService } from './static.service';
import UploadedFileRDO from './rdo/uploaded-file.rdo';
import { fillRDO } from '@project/util/util-core'
import { ConfigService } from '@nestjs/config';


@Controller('files')
export class StaticController {
  constructor
    (
      private readonly staticService: StaticService,
      private readonly configService: ConfigService
    ) {}


  @Post('/upload')
  @UseInterceptors(FileInterceptor('image'))
  public async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const newFile = await this.staticService.uploadFile(file);
    const path = `${this.configService.get('fs-application.serveRoot')}${newFile.path}`;
    return fillRDO(UploadedFileRDO, Object.assign(newFile, { path }));
  }


  @Get('/:id')
  public async getFile(@Param('id') fileId: string) {
    const existFile = await this.staticService.getFile(fileId);
    const path = `${this.configService.get('fs-application.serveRoot')}${existFile.path}`;
    return fillRDO(UploadedFileRDO, Object.assign(existFile, { path }));
  }

}
