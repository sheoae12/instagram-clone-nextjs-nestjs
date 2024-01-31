import { Injectable } from "@nestjs/common";
import { getCurrentDate } from "src/common/util/date";
import { Bookmark } from "src/entities/bookmark/bookmark.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class BookmarkRepository extends Repository<Bookmark> {
    constructor(private dataSource: DataSource) {
        super(Bookmark, dataSource.createEntityManager());
    }

    bookmarkFeed(feedId: number, userId: number) {
        return this.createQueryBuilder()
            .insert()
            .values({
                feedId,
                userId,
                createdAt: getCurrentDate()
            })
            .execute();
    }

    unbookmarkFeed(feedId: number, userId: number) {
        return this.createQueryBuilder()
            .delete()
            .where('feedId = :feedId', { feedId })
            .andWhere('userId = :userId', { userId })
            .execute();
    }
}