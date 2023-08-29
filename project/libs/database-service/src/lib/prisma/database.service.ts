import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import {PrismaClient as PrismaBaseMongoClient} from ".prisma/mongo-schema"
import {PrismaClient as PrismaPostgresClient} from ".prisma/postgres-schema"
import {PrismaClient as PrismaFsClient } from ".prisma/file-schema"
import { getMongoConnectionString, getPostgresConnectionString } from "@project/util/util-core"


@Injectable()
export class DatabaseService implements OnModuleInit {

  private mongoBaseConnector: PrismaBaseMongoClient;
  private mongoFsConnector: PrismaFsClient;
  private PSQLConnector: PrismaPostgresClient;

  constructor(private configService: ConfigService) {

    const mongoConfig = configService.get('mongo-db');
    const mongoURL = getMongoConnectionString(mongoConfig)

    const mongoFsConfig = configService.get('mongo-db-fs');
    const mongoFsURL = getMongoConnectionString(mongoFsConfig);

    const postgresConfig = configService.get('postgres-db');
    const postgresURL = getPostgresConnectionString(postgresConfig)


    this.mongoBaseConnector = new PrismaBaseMongoClient({
      datasources: {
        db: {
          url: mongoURL
        }
      }
    })


    this.mongoFsConnector = new PrismaFsClient({
      datasources: {
        db: {
          url: mongoFsURL
        }
      }
    })


    this.PSQLConnector = new PrismaPostgresClient({
      datasources: {
        db: {
          url: postgresURL
        }
      }
    })
  }

  async onModuleInit() {
     await this.mongoBaseConnector.$connect();
     await this.mongoFsConnector.$connect();
     await this.PSQLConnector.$connect();
   }

   get prismaBaseMongoConnector(): PrismaBaseMongoClient {
    return this.mongoBaseConnector;
   }

   get prismaPostgresConnector() : PrismaPostgresClient {
    return this.PSQLConnector;
   }

   get prismaFsMongoConnector(): PrismaFsClient {
    return this.mongoFsConnector;
   }

}
