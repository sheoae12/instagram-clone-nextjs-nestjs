import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MaxLength } from "class-validator";

export class SetProfileDto {
    @ApiProperty({
        description: '프로필 이미지 파일',
        type: 'string',
        format: 'binary',
        required: true
    })
    @IsOptional()
    file: any;

    @ApiProperty({
        description: '유저 uid',
        type: 'string',
        example: 'absdfasgd',
        required: true
    })
    @IsString()
    uid: string;

    @ApiProperty({
        description: '프로필 소개문구',
        type: 'string',
        example: '강아지를 사랑하는 여자',
        required: false
    })
    @IsOptional()
    @IsString()
    @MaxLength(150)
    bio: string;
}