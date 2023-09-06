import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import {PrismaClient as PrismaBaseMongoClient} from ".prisma/mongo-schema"
import {PrismaClient as PrismaPostgresClient} from ".prisma/postgres-schema"
import {PrismaClient as PrismaFsClient } from ".prisma/file-schema"
import {PrismaClient as PrismaNotifyClient } from ".prisma/subscriber-schema";
import { getMongoConnectionString, getPostgresConnectionString } from "@project/util/util-core"


@Injectable()
export class DatabaseService implements OnModuleInit {

  private mongoBaseConnector: PrismaBaseMongoClient;
  private mongoFsConnector: PrismaFsClient;
  private mongoNotifyConnector: PrismaNotifyClient;
  private psqlConnector: PrismaPostgresClient;

  constructor(private configService: ConfigService) {

    const mongoConfig = configService.get('mongo-db');
    const mongoURL = getMongoConnectionString(mongoConfig)

    const mongoFsConfig = configService.get('mongo-db-fs');
    const mongoFsURL = getMongoConnectionString(mongoFsConfig);

    const mongoNotifyConfig = configService.get('mongo-db-notify');
    const mongoNotifyURL = getMongoConnectionString(mongoNotifyConfig);

    const postgresConfig = configService.get('postgres-db');
    const postgresURL = getPostgresConnectionString(postgresConfig)



    this.mongoBaseConnector = new PrismaBaseMongoClient({
      datasources: { db: { url: mongoURL } }
    })


    this.mongoFsConnector = new PrismaFsClient({
      datasources: { db: { url: mongoFsURL } }
    })


    this.mongoNotifyConnector = new PrismaNotifyClient({
      datasources: { db: { url: mongoNotifyURL } }
    })


    this.psqlConnector = new PrismaPostgresClient({
      datasources: { db: { url: postgresURL } }
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
