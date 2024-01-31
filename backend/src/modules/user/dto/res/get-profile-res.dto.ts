import { Exclude } from "class-transformer";

export class ProfileResponse {
    uid: string;
    name: string;
    nickname: string;
    accessToken: string;

    constructor(data: any) {
        this.uid = data.userInfo.uid;
        this.name = data.userInfo.name;
        this.nickname = data.userInfo.nickname;
        this.accessToken = data.accessToken;
    }
}