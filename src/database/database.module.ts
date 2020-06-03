import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

const path = require('path');

@Module({
    imports : [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService : ConfigService) => ({
                type: 'postgres',
                //since this is a module, we can use configService GET methods to pull
                //environment variables
                host: configService.get('POSTGRES_HOST'),
                port: configService.get('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DB'),
                entities: [path.dirname(__dirname + '/../**/*.entity.ts')],
                synchronize: false
            }),
        }),
    ],
})

export class DatabaseModule {}