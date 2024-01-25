import { Injectable } from "@nestjs/common";
import { getCurrentDate } from "src/common/util/date";
import { FeedComment } from "src/entities/feed/feed-comment.entity";
import { Feed } from "src/entities/feed/feed.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class FeedRepository extends Repository<Feed> {
    constructor(private dataSource: DataSource) {
        super(Feed, dataSource.createEntityManager());
    }

    getUserFeeds(uid: number) {
        return this.createQueryBuilder('feed')
            .select([
                'feed.id AS id',
                'feed.caption AS caption',
                'feed.createdAt AS createdAt',
                'user.uid AS uid',
                'user.nickname AS nickname',
                'resource.url AS url',
                'resource.type AS type'
            ])
            .leftJoin('feed.resource', 'resource')
            .leftJoin('feed.user', 'user')
            .getRawMany();
    }
}