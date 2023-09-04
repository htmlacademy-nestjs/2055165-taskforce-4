import { Module } from "@nestjs/common";
import { DatabaseModule } from '@project/database-service'

@Module({
  imports: [DatabaseModule],
  providers: [],
  exports: []
})
export class AppModule {

}
