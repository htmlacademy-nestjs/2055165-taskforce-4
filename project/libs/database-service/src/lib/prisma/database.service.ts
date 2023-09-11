import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import {PrismaClient as PrismaBaseMongoClient} from ".prisma/mongo-schema"
import {PrismaClient as PrismaPostgresClient} from ".prisma/postgres-schema"
import {PrismaClient as PrismaFsClient } from ".prisma/file-schema"
import {PrismaClient as PrismaNotifyClient } from ".prisma/subscriber-schema";
import { getMongoConnectionString, getPostgresConnectionString } from "@project/util/util-core"
import { DbConfig } from "@project/config-service";


@Injectable()
export class DatabaseService implements OnModuleInit {

  private mongoBaseConnector: PrismaBaseMongoClient;
  private mongoFsConnector: PrismaFsClient;
  private mongoNotifyConnector: PrismaNotifyClient;
  private psqlConnector: PrismaPostgresClient;

  constructor(private configService: ConfigService) {

    this.mongoBaseConnector = new PrismaBaseMongoClient({
      datasources: { db: { url: getMongoConnectionString(configService.getOrThrow<DbConfig>('mongo-db')) } }
    })


    this.mongoFsConnector = new PrismaFsClient({
      datasources: { db: { url: getMongoConnectionString(configService.getOrThrow<DbConfig>('mongo-db-fs')) } }
    })


    this.mongoNotifyConnector = new PrismaNotifyClient({
      datasources: { db: { url: getMongoConnectionString(configService.getOrThrow<DbConfig>('mongo-db-notify')) } }
    })


    this.psqlConnector = new PrismaPostgresClient({
      datasources: { db: { url: getPostgresConnectionString(configService.getOrThrow<DbConfig>('postgres-db')) } }
    })
  }

  async onModuleInit() {
     await this.mongoBaseConnector.$connect();
     await this.mongoFsConnector.$connect();
     await this.mongoNotifyConnector.$connect();
     await this.psqlConnector.$connect();
   }

   get prismaBaseMongoConnector(): PrismaBaseMongoClient {
    return this.mongoBaseConnector;
   }

   get prismaPostgresConnector() : PrismaPostgresClient {
    return this.psqlConnector;
   }

   get prismaFsMongoConnector(): PrismaFsClient {
    return this.mongoFsConnector;
   }

   get prismaNotifyMongoConnector(): PrismaNotifyClient {
    return this.mongoNotifyConnector;
   }

}
