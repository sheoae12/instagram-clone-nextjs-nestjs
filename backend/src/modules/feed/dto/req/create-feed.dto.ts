import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateFeedDto {
    @ApiProperty({
        description: '피드 콘텐츠 파일',
        type: 'string',
        format: 'binary',
        required: true
    })
    file: any;

    @ApiProperty({
        description: '작성자 UID',
        example: 'abcdefg',
        type: 'string',
        required: true
    })
    @IsString()
    uid: string;

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