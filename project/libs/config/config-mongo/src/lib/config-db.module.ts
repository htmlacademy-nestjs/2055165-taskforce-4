import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import mongoConnectorConfig from "./mongo-connector.config";
import postgresConnectorConfig from "./postgres-connector.config";

const ENV_MONGO_DB_PATH = 'mongo.env';
const ENV_POSTGRES_DB_PATH = 'apps/tasks/postgres.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [mongoConnectorConfig, postgresConnectorConfig],
      envFilePath: [ENV_MONGO_DB_PATH, ENV_POSTGRES_DB_PATH]
    })
  ],
  providers: [ConfigService],
  exports:[ConfigService]
})
export class ConfigDbModule {}
