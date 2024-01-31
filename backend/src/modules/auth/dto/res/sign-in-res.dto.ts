import { Exclude } from "class-transformer";

export class SignInResponse {
    uid: string;
    name: string;
    nickname: string;
    accessToken: string;
    profileImg: string;

    constructor(data: any) {
        this.uid = data.userInfo.uid;
        this.name = data.userInfo.name;
        this.nickname = data.userInfo.nickname;
        this.profileImg = data.userInfo.profileimg;
        this.accessToken = data.accessToken;
    }
}