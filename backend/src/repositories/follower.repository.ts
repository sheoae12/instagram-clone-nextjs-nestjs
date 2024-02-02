import { Injectable } from "@nestjs/common";
import { getCurrentDate } from "src/common/util/date";
import { Follower } from "src/entities/userinfo/follower.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class FollowerRepository extends Repository<Follower> {
    constructor(private dataSource: DataSource) {
        super(Follower, dataSource.createEntityManager());
    }

    createFollower(followerId: number, followingId: number) {
        return this.createQueryBuilder()
            .insert()
            .values({
                followerId,
                followingId,
                createdAt: getCurrentDate()
            })
            .execute();
    }

    acceptFollow(followerId: number, followingId: number) {
        return this.createQueryBuilder()
            .update()
            .set({
                accept: 'T'
            })
            .where('followerId = :followerId', { followerId })
            .andWhere('followingId = :followingId', { followingId })
            .execute();
    }

    deleteFollower(followerId: number, followingId: number) {
        return this.createQueryBuilder()
            .delete()
            .where('followerId = :followerId', { followerId })
            .andWhere('followingId = :followingId', { followingId })
            .execute();
    }
}