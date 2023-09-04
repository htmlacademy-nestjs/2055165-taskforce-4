import { Module } from "@nestjs/common";
import { ConfigDbModule } from "@project/config-service"
import { DatabaseService } from "./database.service";

@Module({
  imports: [ConfigDbModule],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {

}
