import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../../../node_modules/@internal/prisma/mongo-schema';

@Injectable()
export class PrismaMongoService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
