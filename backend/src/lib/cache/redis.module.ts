import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';

@Module({
    imports: [ConfigModule],
    providers: [ConfigService, RedisService, Logger],
    exports: [RedisService]
})
export class RedisModule {
    constructor(
        private configService: ConfigService,
        logger: Logger
    ) {
        logger.log(
            `Redis at ${configService.get<string>('redis.host')}:${configService.get<number>('redis.port')} connected`,
            'RedisModule'
        );
    }
}
