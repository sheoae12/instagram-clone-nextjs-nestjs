import { Injectable } from "@nestjs/common";
import { FeedLike } from "src/entities/feed/feed-like.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class FeedLikeRepository extends Repository<FeedLike> {
    constructor(private dataSource: DataSource) {
        super(FeedLike, dataSource.createEntityManager());
    }
}