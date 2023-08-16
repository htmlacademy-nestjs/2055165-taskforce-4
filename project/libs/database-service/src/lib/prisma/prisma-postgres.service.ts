import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../../../node_modules/@internal/prisma/postgres-schema';

@Injectable()
export class PrismaPostgresService extends PrismaClient implements OnModuleInit {

  constructor() {
    super({
      datasources: {
        db: {
          url: "postgresql://admin:pass@localhost:6500/taskforce?schema=public"
        }
      }
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
}
