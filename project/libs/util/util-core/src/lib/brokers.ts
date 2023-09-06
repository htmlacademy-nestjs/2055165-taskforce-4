import { ConfigService } from '@nestjs/config';
import { getRabbitMQConnectionString } from './helpers';
import { ConfigAppsModule } from '@project/config-service';

export function getRabbitMQOptions(optionSpace: string) {
  return {
    imports:[ConfigAppsModule],
    useFactory: async (config: ConfigService) => ({
      exchanges: [
          {
            name: config.get(`${optionSpace}.queue`) as string,
            type: 'direct'
          }
        ],
        uri:getRabbitMQConnectionString({
          host: config.get(`${optionSpace}.host`) as string,
          password: config.get(`${optionSpace}.password`) as string,
          user: config.get(`${optionSpace}.user`) as string,
          port: config.get(`${optionSpace}.port`) as string
        }),
        connectionInitOptions: { wait: true },
        enableControllerDiscovery: true,
      }),
    inject: [ConfigService]
  }
}
