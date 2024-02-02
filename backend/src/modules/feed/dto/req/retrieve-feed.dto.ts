import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class RetrieveFeedDto {
    @ApiProperty({
        description: '페이지 넘버',
        example: 1,
        type: 'number',
        required: true
    })
    @IsNumber()
    pageNo: number;

    @ApiProperty({
        description: '가져올 피드 개수',
        example: 9,
        type: 'number',
        required: true
    })
    @IsNumber()
    feedCount: number;

    @ApiProperty({
        description: '유저 uid',
        example: 'absdfs',
        type: 'string',
        required: true
    })
    @IsString()
    uid: string;
}