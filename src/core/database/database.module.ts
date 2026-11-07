import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './database.config';

@Module({
    imports: [
        ConfigModule.forRoot({ load: [databaseConfig], isGlobal: true }),
        TypeOrmModule.forRootAsync({
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => configService.getOrThrow('database'),
        }),
    ],
})
export class DatabaseModule {}
