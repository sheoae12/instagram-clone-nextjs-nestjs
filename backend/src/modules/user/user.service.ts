import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { FirebaseService } from "src/lib/firebase/firebase.service";
import { DataSource } from "typeorm";
import { ResourceRepository } from "src/repositories/resource.repository";
import { UserRepository } from "src/repositories/user.repository";
import { SetProfileDto } from "./dto/req/set-profile.dto";
import { ProfileRepository } from "src/repositories/profile.repository";
import { plainToInstance } from "class-transformer";
import { Profile } from "src/entities/userinfo/profile.entity";
import { FollowerRepository } from "src/repositories/follower.repository";
import { FollowUserDto } from "./dto/req/follow-user.dto";

@Injectable()
export class UserService {
    logger = new Logger(UserService.name);

    constructor(
        private readonly dataSource: DataSource,
        private readonly firebaseService: FirebaseService,
        private readonly resourceRepository: ResourceRepository,
        private readonly userRepository: UserRepository,
        private readonly profileRepository: ProfileRepository,
        private readonly followerRepository: FollowerRepository
    ) {}

    async setProfile(file: Express.Multer.File, payload: SetProfileDto) {
        this.logger.debug(`[setProfile] set user ${payload.uid} profile`);

        const resource = await this.firebaseService.uploadImageFile(file);
        const userId = await this.userRepository.findById(payload.uid);

        const queryRunner = await this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();
        
        try {
            await this.profileRepository.updateProfile(userId, resource.url, payload.bio);
            await queryRunner.commitTransaction();
            return 'success';
        } catch (error) {
            this.logger.error(`[setProfile] save profile error`, error);
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(`save profile error`);
        } finally {
            await queryRunner.release();
        }
    }

    async viewProfile(uid: string) {
        this.logger.debug(`[viewProfile] get user ${uid} profile`);

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

    async getFollowings(uid: string) {
        this.logger.debug(`[getFollowings] get user ${uid} following list`);

        const userId = await this.userRepository.findById(uid);

        try {
            return await this.followerRepository.find({ where: { followerId: userId }});
        } catch (error) {
            this.logger.error(`[getFollowings] get follwing list error`, error);
            throw new InternalServerErrorException(`get following list error`);
        }
    }

    async getFollowers(uid: string) {
        this.logger.debug(`[getFollowers] get user ${uid} follower list`);

        const userId = await this.userRepository.findById(uid);

        try {
            return await this.followerRepository.find({ where: { followingId: userId }});
        } catch (error) {
            this.logger.error(`[getFollowers] get follwer list error`, error);
            throw new InternalServerErrorException(`get follower list error`);
        }
    }

    async followUser(payload: FollowUserDto) {
        this.logger.debug(`[followUser] create follower entity`)

        const { followerId, followingId } = await this.isFollowerTargetUserValid(payload.follower, payload.target);

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try {
            await this.followerRepository.createFollower(followerId, followingId);
            await queryRunner.commitTransaction();
            return 'success'
        } catch (error) {
            this.logger.error(`[followUser] create follower entity error`, error);
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(`create follower data error`);
        } finally {
            await queryRunner.release();
        }
    }

    async acceptFollow(payload: FollowUserDto) {
        this.logger.debug(`[acceptFollow] change follow status`);

        const { followerId, followingId } = await this.isFollowerTargetUserValid(payload.follower, payload.target);

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try {
            await this.followerRepository.acceptFollow(followerId, followingId);
            await queryRunner.commitTransaction();
            return 'success'
        } catch (error) {
            this.logger.error(`[acceptFollow] update follow status error`, error);
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(`accept follow error`);
        } finally {
            await queryRunner.release();
        }
    }

    async unfollowUser(payload: FollowUserDto) {
        this.logger.debug(`[unfollowUser] unfollow user`);

        const { followerId, followingId } = await this.isFollowerTargetUserValid(payload.follower, payload.target);

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try {
            await this.followerRepository.deleteFollower(followerId, followingId);
        } catch (error) {
            this.logger.error(`[unfollowUser] delete follower data error`, error);
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(`unfollower user error`);
        } finally {
            await queryRunner.release();
        }
    }

    /**
     * check uid in payload is valid uid
     */
    async isFollowerTargetUserValid(follower: string, target: string) {
        const followerId = await this.userRepository.findById(follower);
        const followingId = await this.userRepository.findById(target);

        return { followerId, followingId };
    }
}