import { Injectable, NotFoundException } from "@nestjs/common";
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

    async findById(uid: string): Promise<number> {
        const user = await this.findOneBy({ uid });

        if (!user) {
            throw new NotFoundException(`user id not found: ${uid}`);
        }

        return user.id;
    }

    async getProfileImg(uid: string): Promise<string> {
        const user = await this.findOneBy({ uid });

        if (!user) {
            throw new NotFoundException(`user id not found: ${uid}`);
        }

        return user.profileImg;
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
        data.uid = uuidv4();
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

    getUserInfo(target: string) {
        return this.createQueryBuilder()
            .select([
                'user.account AS account', 
                'user.uid AS uid', 
                'user.name AS name', 
                'user.nickname AS nickname',
                'user.profileImg AS profileImg' // 이유는 모르겠으나 'profileimg'로 가져와짐
            ])
            .from(User, 'user')
            .where('user.account = :account', { account: target })
            .getRawOne();
    }
}