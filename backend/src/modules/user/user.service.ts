import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { FirebaseService } from "src/lib/firebase/firebase.service";
import { DataSource } from "typeorm";
import { ResourceRepository } from "src/repositories/resource.repository";
import { FeedRepository } from "src/repositories/feed.repository";
import { UserRepository } from "src/repositories/user.repository";
import { SetProfileDto } from "./dto/req/set-profile.dto";
import { ProfileRepository } from "src/repositories/profile.repository";
import { plainToInstance } from "class-transformer";
import { Profile } from "src/entities/userinfo/profile.entity";

@Injectable()
export class UserService {
    logger = new Logger(UserService.name);

    constructor(
        private readonly dataSource: DataSource,
        private readonly firebaseService: FirebaseService,
        private readonly resourceRepository: ResourceRepository,
        private readonly userRepository: UserRepository,
        private readonly profileRepository: ProfileRepository
    ) {}

    async setProfile(file: Express.Multer.File, payload: SetProfileDto) {
        const resource = await this.firebaseService.uploadImageFile(file);
        const userId = await this.userRepository.findById(payload.uid);
        
        try {
            await this.profileRepository.updateProfile(userId, resource.url, payload.bio);
            return 'success';
        } catch (error) {
            this.logger.error(`[setProfile] save profile error`, error);
            throw new InternalServerErrorException(`save profile error`);
        }
    }

    async viewProfile(uid: string) {
        const userId = await this.userRepository.findById(uid);
        
        try {
            const userInfo = await this.userRepository.findOneBy({ uid });
            const profile = await this.profileRepository.findOneBy({ userId });

            return { ...userInfo, ...profile };
        } catch (error) {
            this.logger.error(`[viewProfile] get profile error`, error);
            throw new InternalServerErrorException(`get profile error`);
        }
    }
}