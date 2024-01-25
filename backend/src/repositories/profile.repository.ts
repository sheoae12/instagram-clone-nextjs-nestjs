import { Injectable } from "@nestjs/common";
import { getCurrentDate } from "src/common/util/date";
import { Profile } from "src/entities/userinfo/profile.entity";
import { User } from "src/entities/userinfo/user.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class ProfileRepository extends Repository<Profile> {
    constructor(private dataSource: DataSource) {
        super(Profile, dataSource.createEntityManager());
    }

    async updateProfile(userId: number, url: string, bio: string) {
        const userRepository = this.dataSource.getRepository(User);
        await userRepository.update({ id: userId }, { 
            profileImg: url, 
            updatedAt: getCurrentDate() 
        });
        await this.update({ userId }, { bio });
    }
}