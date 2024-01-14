import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './common/exception-filters/http-exception.filter';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfig } from './config/swagger.config';

async function bootstrap() {
    const logger = new Logger('NestApplication');

    const app = await NestFactory.create(AppModule);

    app.useGlobalFilters(new HttpExceptionFilter());

    const configService = app.get(ConfigService);
    const port = configService.get<number>('app.port', 8080);

    const document = SwaggerModule.createDocument(app, SwaggerConfig);
    SwaggerModule.setup('api', app, document);

    await app.listen(port);
    logger.log(`app started at port ${port}`);
}
bootstrap();
