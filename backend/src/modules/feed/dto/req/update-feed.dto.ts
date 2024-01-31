import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateFeedDto {
    @ApiProperty({
        description: '피드 id',
        example: '52',
        type: 'number',
        required: true
    })
    @IsNumber()
    feedId: number;

    @ApiProperty({
        description: '피드 문구',
        example: '오늘의 OOTD #좋아요#댓글#환영',
        type: 'string',
        required: true
    })
    @IsString()
    @MinLength(1)
    @MaxLength(2200)
    caption: string;
}