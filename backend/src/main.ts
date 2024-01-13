import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const logger = new Logger('NestApplication');

    const app = await NestFactory.create(AppModule);

    const configService = app.get(ConfigService);
    const port = configService.get<number>('app.port', 8080);

    await app.listen(port);
    logger.log(`app started at port ${port}`);
}
bootstrap();
