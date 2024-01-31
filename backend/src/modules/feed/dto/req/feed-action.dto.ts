import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class FeedActionDto {
    @ApiProperty({
        description: '유저 uid',
        example: 'abcefg',
        type: 'string',
        required: true
    })
    @IsString()
    uid: string;

    @ApiProperty({
        description: '피드 id',
        example: 5,
        type: 'number',
        required: true
    })
    @IsNumber()
    feedId: number;
}