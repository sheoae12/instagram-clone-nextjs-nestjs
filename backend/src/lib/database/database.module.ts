import { Logger, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource, DataSourceConfig } from './datasource';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => {
                const configs = DataSourceConfig(configService);
                return {
                    ...configs,
                    synchronize: false
                };
            }
        })
    ],
    providers: [Logger]
})
export class DatabaseModule {
    constructor(
        private configService: ConfigService,
        logger: Logger
    ) {
        const DataSource = AppDataSource(configService);
        DataSource.initialize()
            .then(() => {
                logger.log('Data Source has been initialized!', 'DatabaseModule');
            })
            .catch((err) => {
                logger.error('Error during Data Source initialization', err);
            });
    }
}
