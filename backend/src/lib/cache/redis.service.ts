import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { getCurrentDate, getFormattedDate } from 'src/common/util/util';

@Injectable()
export class RedisService {
    private redis: Redis;
    private logger: Logger;
    constructor(private configService: ConfigService) {
        this.logger = new Logger(RedisService.name);
        this.redis = new Redis({
            host: configService.get<string>('redis.host'),
            port: configService.get<number>('redis.port')
        });
    }

    async get(key: string): Promise<string | null> {
        this.logger.log(`REDIS:: GET key ${key}`);
        return await this.redis.get(key);
    }

    async set(
        key: string,
        value: string | number | Buffer,
        ttl?: number
    ): Promise<void> {
        ttl = ttl ?? this.configService.get<number>('redis.ttl');

        await this.redis.set(key, value);
        await this.redis.expire(key, ttl as number);

        const date = getFormattedDate(getCurrentDate());
        this.logger.log(`REDIS:: SET key ${key}=${value} EXPIRE AT ${date}`);
    }

    async del(key: string): Promise<void> {
        await this.redis.del(key);
        this.logger.log(`REDIS:: DELETE key ${key}`);
    }
}
