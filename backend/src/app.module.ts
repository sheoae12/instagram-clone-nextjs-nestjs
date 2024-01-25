import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { HttpModule } from '@nestjs/axios';
import { DatabaseModule } from './lib/database/database.module';
import { RedisModule } from './lib/cache/redis.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { FirebaseModule } from './lib/firebase/firebase.module';
import { FeedModule } from './modules/feed/feed.module';
import { UserModule } from './modules/user/user.module';

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
        RedisModule,
        AuthModule,
        FirebaseModule,
        FeedModule,
        UserModule
    ],
    controllers: [AppController],
    providers: [
        {
            provide: APP_FILTER,
            useClass: HttpExceptionFilter
        },
        AppService, 
        Logger
    ]
})
export class AppModule {}
