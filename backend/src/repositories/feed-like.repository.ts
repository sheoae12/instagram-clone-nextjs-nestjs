import { Injectable } from "@nestjs/common";
import { getCurrentDate } from "src/common/util/date";
import { FeedLike } from "src/entities/feed/feed-like.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class FeedLikeRepository extends Repository<FeedLike> {
    constructor(private dataSource: DataSource) {
        super(FeedLike, dataSource.createEntityManager());
    }

    getUserList(feedId: number) {
        return this.createQueryBuilder('feedLike')
            .select([
                'feedLike.id AS id',
                'user.nickname AS nickname',
                'user.profileImg AS profileimg'
            ])
            .leftJoin('feedLike.user', 'user')
            .where('feedLike.feedId = :feedId', { feedId })
            .orderBy('feedLike.id', 'DESC')
            .getRawMany();
    }

    likeFeed(feedId: number, userId: number) {
        return this.createQueryBuilder()
            .insert()
            .values({
                feedId,
                userId,
                createdAt: getCurrentDate()
            })
            .execute();
    }

    unLikeFeed(feedId: number, userId: number) {
        return this.createQueryBuilder()
            .delete()
            .where('feedId = :feedId', { feedId })
            .andWhere('userId = :userId', { userId })
            .execute();
    }
}