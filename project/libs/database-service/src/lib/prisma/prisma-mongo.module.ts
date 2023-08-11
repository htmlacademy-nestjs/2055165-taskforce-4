import { Global, Module } from '@nestjs/common';
import { PrismaMongoService } from './prisma-mongo.service';

@Global()
@Module({
  providers: [PrismaMongoService],
  exports: [PrismaMongoService]
})
export class PrismaMongoModule {}
