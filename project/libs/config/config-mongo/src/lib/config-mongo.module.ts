import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import usersAppConfig from "./users-app.config";
import authAppConfig from "./auth-app.config";
import feedbacksAppConfig from "./feedbacks-app.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [usersAppConfig, authAppConfig, feedbacksAppConfig],
    })
  ]
})
export class ConfigMongoModule{}
