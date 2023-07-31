import { Body, Controller, Get, Param, Post } from '@nestjs/common';

import { StaticService } from './static.service';

@Controller('files')
export class StaticController {
  constructor
    (private readonly staticService: StaticService) {}

  @Post('/upload')
  public async uploadFile(@Body() file: string) {
    const fileId = await this.staticService.uploadFile(file);
    return fileId;
  }

  @Get(':id')
  public async getFile(@Param('id') fileId: string) {
    const file = await this.staticService.getFile(fileId);
    return file;
  }

}
