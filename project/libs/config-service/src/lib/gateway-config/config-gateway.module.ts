import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";

import gatewayConfig from "./gateway.config";

const ENV_FILE_PATH = 'apps/api-gateway/gateway.env';


@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      load: [gatewayConfig],
      envFilePath: [ENV_FILE_PATH],
    })
  ],
  providers: [ConfigService],
  exports:[ConfigService]
})
export class ConfigGatewayModule{}
