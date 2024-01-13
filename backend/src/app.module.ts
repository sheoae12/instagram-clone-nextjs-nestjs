import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from './lib/database/database.module';
import { RedisModule } from './lib/cache/redis.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration]
        }),
        HttpModule.registerAsync({
            useFactory: () => ({
                timeout: 5000,
                maxRedirects: 5
            })
        }),
        DatabaseModule,
        RedisModule
    ],
    controllers: [AppController],
    providers: [AppService, Logger]
})
export class AppModule {}
