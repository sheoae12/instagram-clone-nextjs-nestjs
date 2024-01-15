import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class SignInDto {
    @ApiProperty({
        description: '메일, 계정, 전화번호',
        example: 'hello@gmail.com'
    })
    @IsString()
    @MaxLength(64)
    account: string;

    @ApiProperty({
        description: '비밀번호',
        example: 'password'
    })
    @IsString()
    @MaxLength(16)
    password: string;
}