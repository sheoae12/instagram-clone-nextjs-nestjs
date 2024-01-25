import { Module } from '@nestjs/common';
import { FirebaseModule } from 'src/lib/firebase/firebase.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtConfig } from 'src/config/jwt.config';
import { FeedController } from './feed.controller';
import { FeedService } from './feed.service';
import { ResourceRepository } from 'src/repositories/resource.repository';
import { FeedRepository } from 'src/repositories/feed.repository';
import { UserRepository } from 'src/repositories/user.repository';

@Module({
    imports: [FirebaseModule],
    controllers: [FeedController],
    providers: [FeedService, ResourceRepository, FeedRepository, UserRepository]
})
export class FeedModule {}
