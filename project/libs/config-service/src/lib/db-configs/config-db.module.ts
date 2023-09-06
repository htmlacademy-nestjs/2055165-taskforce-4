import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import mongoBaseConnectorConfig from "./mongo-base-connector.config";
import postgresConnectorConfig from "./postgres-connector.config";
import mongoFsConnectorConfig from "./mongo-fs-connector.config";
import mongoNotifyConnector from "./mongo-notify-connector.config";

const ENV_MONGO_DB_PATH = 'mongo-base.env';
const ENV_POSTGRES_DB_PATH = 'apps/tasks/tasks.env';
const ENV_MONGO_FS_DB_PATH = 'apps/fs/fs.env'
const ENV_MONGO_NOTIFY_DB_PATH = 'apps/notify/notify.env'

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [
        mongoBaseConnectorConfig,
        postgresConnectorConfig,
        mongoFsConnectorConfig,
        mongoNotifyConnector
      ],
      envFilePath: [
        ENV_MONGO_DB_PATH,
        ENV_POSTGRES_DB_PATH,
        ENV_MONGO_FS_DB_PATH,
        ENV_MONGO_NOTIFY_DB_PATH
      ]
    })
  ],
  providers: [ConfigService],
  exports:[ConfigService]
})
export class ConfigDbModule {}
