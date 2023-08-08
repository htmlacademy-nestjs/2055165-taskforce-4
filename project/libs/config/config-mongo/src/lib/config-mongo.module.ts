import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import usersAppConfig from "./users-app.config";
import authAppConfig from "./auth-app.config";
import feedbacksAppConfig from "./feedbacks-app.config";
import dbConfig from "./db.config";

const ENV_MONGO_CONF_FILE_PATH = 'mongo.env';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [usersAppConfig, authAppConfig, feedbacksAppConfig, dbConfig],
      envFilePath: ENV_MONGO_CONF_FILE_PATH
    })
  ]
})
export class ConfigMongoModule{}
