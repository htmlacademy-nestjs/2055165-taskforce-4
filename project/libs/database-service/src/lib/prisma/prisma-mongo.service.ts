import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../../../node_modules/@internal/prisma/mongo-schema';

@Injectable()
export class PrismaMongoService extends PrismaClient implements OnModuleInit {

  constructor() {
    super({
      datasources: {
        db: {
          url: "mongodb://admin:pass@localhost:27017/taskforce?authSource=admin"
        }
      }
    });
  }

  async onModuleInit() {
    await this.$connect();
  }
}
