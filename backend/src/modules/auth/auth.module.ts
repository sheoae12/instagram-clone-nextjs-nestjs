import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from 'src/repositories/user.repository';
import { FirebaseModule } from 'src/lib/firebase/firebase.module';

@Module({
    imports: [FirebaseModule],
    controllers: [AuthController],
    providers: [AuthService, UserRepository]
})
export class AuthModule {}
