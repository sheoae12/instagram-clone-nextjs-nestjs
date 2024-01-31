import { Injectable, InternalServerErrorException, Logger } from "@nestjs/common";
import { FirebaseService } from "src/lib/firebase/firebase.service";
import { CreateFeedDto } from "./dto/req/create-feed.dto";
import { DataSource } from "typeorm";
import { FileType } from "src/entities/enum/filetype.enum";
import { ResourceRepository } from "src/repositories/resource.repository";
import { FeedRepository } from "src/repositories/feed.repository";
import { plainToInstance } from "class-transformer";
import { Feed } from "src/entities/feed/feed.entity";
import { UserRepository } from "src/repositories/user.repository";
import { FeedLikeRepository } from "src/repositories/feed-like.repository";
import { FeedCommentRepository } from "src/repositories/feed-comment.repository";

@Injectable()
export class FeedService {
    logger = new Logger(FeedService.name);

    constructor(
        private readonly dataSource: DataSource,
        private readonly firebaseService: FirebaseService,
        private readonly resourceRepository: ResourceRepository,
        private readonly feedRepository: FeedRepository,
        private readonly userRepository: UserRepository,
        private readonly feedLikeRepsository: FeedLikeRepository,
        private readonly feedCommentRepository: FeedCommentRepository
    ) {}

    async getUserFeed(uid: string) {
        this.logger.debug(`[getUserFeed] get feed by userId ${uid}`);

        const userId = await this.userRepository.findById(uid);

        try {
            const result = await this.feedRepository.getUserFeeds(userId);

            for (let data of result) {
                const profileImg = await this.userRepository.getProfileImg(uid);
                const likes = await this.feedLikeRepsository.count({ where: { feedId: data.id }});
                const totalComments = await this.feedCommentRepository.count({ where: { feedId: data.id }});

                data = { ...data, profileImg, likes, totalComments };
            }

            return result;
        } catch (error) {
            this.logger.error(error)
            this.logger.error('[getUserFeed] user feed retrieve error')
            throw new InternalServerErrorException('user feed retrieve error')
        }
    }

    async createFeed(file: Express.Multer.File, payload: CreateFeedDto) {
        this.logger.debug('[uploadFeedImage] Upload to Firebase and Save DB');

        const feed = plainToInstance(Feed, payload);
        feed.userId = await this.userRepository.findById(payload.uid);

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try {
            const resource = await this.uploadFeedImage(file);
            
            feed.resourceId = resource.id;
            const result = await this.feedRepository.save(feed);

            await queryRunner.commitTransaction();
            return result;
        } catch (error) {
            this.logger.error(error)
            this.logger.error('[createFeed] feed create error');
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(`[createFeed] save feed data error`);
        } finally {
            await queryRunner.release();
        }
    }

    async uploadFeedImage(file: Express.Multer.File, payload?: any) {
        this.logger.debug('[uploadFeedImage] Upload to Firebase and Save DB');

        const originalType = file.mimetype.split('/')[0];
        const fileType = Object.keys(FileType)[Object.values(FileType).indexOf(originalType as FileType)];
        
        const uploadResult = await this.firebaseService.uploadImageFile(file);

        try {
            return await this.resourceRepository.createResource(uploadResult.url, fileType);
        } catch (error) {
            this.logger.error(error)
            this.logger.error(`[uploadFeedImage] resource save error`);
            throw new InternalServerErrorException('resource save error');
        }
        
    }
}