import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RoostHttpModule } from './roost/roost-http.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    RoostHttpModule,
    DatabaseModule,
    //automatically parses our .env file, can be accessed using 'GET' with ConfigService
    ConfigModule.forRoot()
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
