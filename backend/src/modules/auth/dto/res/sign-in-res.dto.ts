import { Exclude } from "class-transformer";

export class SignInResponse {
    userId: string;
    name: string;
    nickname: string;
    token: string;

    constructor(data: any) {
        this.userId = data.userInfo.userId;
        this.name = data.userInfo.name;
        this.nickname = data.userInfo.nickname;
        this.token = data.token;
    }
}