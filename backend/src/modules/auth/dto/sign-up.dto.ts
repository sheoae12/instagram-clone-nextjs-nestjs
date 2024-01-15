import { UsePipes } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber, IsString } from "class-validator";
import { IsEmailOrPhoneNumber } from "src/common/decorator/is-email-phone.decorator";

export class SignUpDto {
    @ApiProperty({
        description: '메일주소 또는 휴대폰번호',
        example: 'hello@gmail.com'
    })
    @IsString()
    @IsEmailOrPhoneNumber()
    account: string;

    @ApiProperty({
        description: '이름',
        example: 'John Doe'
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: '유저네임',
        example: 'John92'
    })
    @IsString()
    nickname: string;

    @ApiProperty({
        description: '패스워드',
        example: 'password'
    })
    @IsString()
    password: string;
}