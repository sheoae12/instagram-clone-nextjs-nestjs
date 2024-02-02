import { Module } from '@nestjs/common';
import { FirebaseModule } from 'src/lib/firebase/firebase.module';
import { ResourceRepository } from 'src/repositories/resource.repository';
import { FeedRepository } from 'src/repositories/feed.repository';
import { UserRepository } from 'src/repositories/user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ProfileRepository } from 'src/repositories/profile.repository';
import { FollowerRepository } from 'src/repositories/follower.repository';

@Module({
    imports: [FirebaseModule],
    controllers: [UserController],
    providers: [
        UserService, 
        ResourceRepository, 
        UserRepository, 
        ProfileRepository,
        FollowerRepository
    ]
})
export class UserModule {}
