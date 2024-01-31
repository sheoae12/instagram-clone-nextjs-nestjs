import { Injectable, InternalServerErrorException, Logger, NotFoundException } from "@nestjs/common";
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
import { UpdateFeedDto } from "./dto/req/update-feed.dto";
import { FeedActionDto } from "./dto/req/feed-action.dto";
import { BookmarkRepository } from "src/repositories/bookmark.repository";

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
        private readonly feedCommentRepository: FeedCommentRepository,
        private readonly bookmarkRepository: BookmarkRepository
    ) {}

    async getUserFeed(uid: string) {
        this.logger.debug(`[getUserFeed] get feed by userId ${uid}`);

        const userId = await this.userRepository.findById(uid);

        try {
            let result = await this.feedRepository.getUserFeeds(userId);

            for (let i = 0; i < result.length; i++) {
                const data = result[i];
                const liked = (await this.feedLikeRepsository.findOneBy({ userId, feedId: data.id })) ? true : false;
                const bookmarked = (await this.bookmarkRepository.findOneBy({ userId, feedId: data.id })) ? true : false;
                const likes = await this.feedLikeRepsository.count({ where: { feedId: data.id }});
                const totalComments = await this.feedCommentRepository.count({ where: { feedId: data.id }});
            
                result[i] = { ...data, liked, bookmarked, likes, totalComments };
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
            throw new InternalServerErrorException(`save feed data error`);
        } finally {
            await queryRunner.release();
        }
    }

    async deleteFeed(feedId: number) {
        this.logger.debug(`[deleteFeed] delete feed ${feedId}`);

        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.startTransaction();

        try {
            await this.feedRepository.delete({ id: feedId });

            await queryRunner.commitTransaction();
            return 'success';
        } catch (error) {
            this.logger.error('[deleteFeed] feed create error', error);
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException(`delete feed error`);
        } finally {
            await queryRunner.release();
        }
    }

    async updateFeed(payload: UpdateFeedDto) {
        const { feedId, caption } = payload;

        this.logger.debug(`[updateFeed] update feed ${feedId}`);

        const isFeedExist = await this.feedRepository.findOneBy({ id: feedId });
        if (!isFeedExist) {
            throw new NotFoundException(`Feed(id: ${feedId}) not found`);
        }

        try {
            await this.feedRepository.updateFeed(feedId, caption);
            return 'success';
        } catch (error) {
            this.logger.error('[updateFeed] feed update error', error);
            throw new InternalServerErrorException(`update feed error`);
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

    async getFeedLikeList(feedId: number) {
        this.logger.debug('[getFeedLikeList] get Feed Likes User List');

        const isFeedExist = await this.feedRepository.findOneBy({ id: feedId });
        if (!isFeedExist) {
            throw new NotFoundException(`Feed(id: ${feedId}) not found`);
        }

        try {
            const result = await this.feedLikeRepsository.getUserList(feedId);
            return result;
        } catch (error) {
            this.logger.error(`[getFeedLikeList] feed ${feedId} likes retrieve error`, error);
            throw new InternalServerErrorException('feed likes retrieve error');
        }
    }

    async likeFeed(payload: FeedActionDto) {
        const { feedId, uid } = payload;

        this.logger.debug('[likeFeed] set Feed Like');

        const isFeedExist = await this.feedRepository.findOneBy({ id: feedId });
        if (!isFeedExist) {
            throw new NotFoundException(`Feed(id: ${feedId}) not found`);
        }

        const userId = await this.userRepository.findById(uid);

        try {
            await this.feedLikeRepsository.likeFeed(feedId, userId);
            return 'success';
        } catch (error) {
            this.logger.error(`[likeFeed] failed to set user ${uid} likes feed ${feedId}`, error);
            throw new InternalServerErrorException('like feed error');
        }
    }

    async unlikeFeed(payload: FeedActionDto) {
        const { feedId, uid } = payload;

        this.logger.debug('[unlikeFeed] unset Feed Like');

        const isFeedExist = await this.feedRepository.findOneBy({ id: feedId });
        if (!isFeedExist) {
            throw new NotFoundException(`Feed(id: ${feedId}) not found`);
        }

        const userId = await this.userRepository.findById(uid);

        try {
            await this.feedLikeRepsository.unLikeFeed(feedId, userId);
            return 'success';
        } catch (error) {
            this.logger.error(`[unlikeFeed] failed to unset user ${uid} likes feed ${feedId}`, error);
            throw new InternalServerErrorException('unlike feed error');
        }
    }

    async bookmarkFeed(payload: FeedActionDto) {
        const { feedId, uid } = payload;

        this.logger.debug('[bookmarkFeed] bookmark feed');

        const isFeedExist = await this.feedRepository.findOneBy({ id: feedId });
        if (!isFeedExist) {
            throw new NotFoundException(`Feed(id: ${feedId}) not found`);
        }

        const userId = await this.userRepository.findById(uid);

        try {
            await this.bookmarkRepository.bookmarkFeed(feedId, userId);
            return 'success';
        } catch (error) {
            this.logger.error(`[bookmarkFeed] failed to user ${uid} bookmark feed ${feedId}`, error);
            throw new InternalServerErrorException('bookmark feed error');
        }
    }

    async unbookmarkFeed(payload: FeedActionDto) {
        const { feedId, uid } = payload;

        this.logger.debug('[unbookmarkFeed] unbookmark feed');

        const isFeedExist = await this.feedRepository.findOneBy({ id: feedId });
        if (!isFeedExist) {
            throw new NotFoundException(`Feed(id: ${feedId}) not found`);
        }

        const userId = await this.userRepository.findById(uid);

        try {
            await this.bookmarkRepository.unbookmarkFeed(feedId, userId);
            return 'success';
        } catch (error) {
            this.logger.error(`[unbookmarkFeed] failed to user ${uid} unbookmark feed ${feedId}`, error);
            throw new InternalServerErrorException('unbookmark feed error');
        }
    }


}