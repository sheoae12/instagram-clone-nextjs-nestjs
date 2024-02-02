import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class FollowUserDto {
    @ApiProperty({
        description: '팔로워 유저 uid',
        type: 'uid',
        example: 'absdfasgd',
        required: true
    })
    @IsString()
    follower: string;

    @ApiProperty({
        description: '팔로잉(target) 유저 uid',
        type: 'string',
        example: 'asdgasdg',
        required: false
    })
    @IsString()
    target: string;
}