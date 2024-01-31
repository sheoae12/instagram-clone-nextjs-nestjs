import { Injectable } from "@nestjs/common";
import { FeedComment } from "src/entities/feed/feed-comment.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class FeedCommentRepository extends Repository<FeedComment> {
    constructor(private dataSource: DataSource) {
        super(FeedComment, dataSource.createEntityManager());
    }
}