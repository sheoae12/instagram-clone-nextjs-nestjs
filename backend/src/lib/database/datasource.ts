import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';

export const DataSourceConfig = (
    configService: ConfigService
): DataSourceOptions => {
    return {
        type: 'postgres',
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        database: configService.get<string>('db.name'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        logging: true,
        entities: ['dist/entities/**/*.entity.js']
    };
};

export const AppDataSource = (configService: ConfigService) => {
    return new DataSource(DataSourceConfig(configService));
};
