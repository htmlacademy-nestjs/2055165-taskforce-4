import { ConfigService } from "@nestjs/config";
import {PrismaClient as PrismaMongoClient} from "@internal/prisma/mongo-schema"
import {PrismaClient as PrismaPostgresClient} from "@internal/prisma/postgres-schema"
import { Injectable, OnModuleInit } from "@nestjs/common";
import { getMongoConnectionString, getPostgresConnectionString } from "@project/util/util-core"


@Injectable()
export class DatabaseService implements OnModuleInit {

  private mongoConnector: PrismaMongoClient;
  private PSQLConnector: PrismaPostgresClient;

  constructor(private configService: ConfigService) {

    const mongoConfig = configService.get('mongo-db');
    const mongoURL = getMongoConnectionString(mongoConfig)

    const postgresConfig = configService.get('postgres-db');
    const postgresURL = getPostgresConnectionString(postgresConfig)


    this.mongoConnector = new PrismaMongoClient({
      datasources: {
        db: {
          url: mongoURL
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
     await this.mongoConnector.$connect();
     await this.PSQLConnector.$connect();
   }

   get prismaMongo(): PrismaMongoClient {
    return this.mongoConnector;
   }

   get prismaPostgres() : PrismaPostgresClient {
    return this.PSQLConnector;
   }

}
