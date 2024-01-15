import { Injectable } from "@nestjs/common";
import { getCurrentDate } from "src/common/util/date";
import { User } from "src/entities/userinfo/user.entity";
import { DataSource, Repository } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export interface InsertUser {
    account: string,
    name: string,
    nickname: string,
    firebaseUid: string
}

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    checkUserExist(condition: string): Promise<User|null> {
        return this.createQueryBuilder()
            .select(['user.account'])
            .from(User, 'user')
            .where('user.account = :condition', { condition })
            .orWhere('user.phoneNumber = :condition', { condition })
            .getOne();
    }

    createUser(data: User): Promise<User> {
        data.userId = uuidv4();
        return this.save(data);
        // return this.createQueryBuilder()
        //     .insert()
        //     .into(User)
        //     .values({
        //         userId: uuidv4(),
        //         account: data.account,
        //         name: data.name,
        //         nickname: data.nickname,
        //         firebaseUid: data.firebaseUid,
        //         createdAt: getCurrentDate()
        //     })
        //     .execute();
    }

    getUserInfoByAccount(account: string) {
        return this.createQueryBuilder()
            .select(['user.account', 'user.userId', 'user.name', 'user.nickname'])
            .from(User, 'user')
            .where('user.account = :account', { account })
            .getOne();
    }
}