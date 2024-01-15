import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/repositories/user.repository';
import { FirebaseModule } from 'src/lib/firebase/firebase.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfig } from 'src/config/jwt.config';

@Module({
    imports: [
        FirebaseModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                ...JwtConfig(configService)
            })
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserRepository]
})
export class AuthModule {}
