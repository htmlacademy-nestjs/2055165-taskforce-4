import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../../../../node_modules/@internal/prisma/postgres-schema';

@Injectable()
export class PrismaPostgresService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
