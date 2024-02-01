import { Body, Controller, Delete, Post, Query, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/req/sign-in.dto";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { SignUpDto } from "./dto/req/sign-up.dto";
import { Response } from "express";
import { SignInResponse } from "./dto/res/sign-in-res.dto";
import { getCurrentDate } from "src/common/util/date";

@ApiTags('유저인증 API')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({ description: '일반 로그인' })
    @Post('signin/common')
    async signIn(
        @Body() payload: SignInDto,
        @Res({ passthrough: true }) response: Response
    ) {
        const result = await this.authService.signIn(payload);
        response.cookie('rft', result.refreshToken, { 
            httpOnly: true, 
            domain: 'localhost',
            path: '/',
            expires: new Date(getCurrentDate().getDate() + 1)
        }); 

        return new SignInResponse(result);
    }

    @ApiOperation({ description: '페이스북 로그인' })
    @Post('signin/facebook')
    async facebookSignIn(@Body() payload: any) {
        return await this.authService.facebookSignIn(payload);
    }

    @ApiOperation({ description: '일반 회원가입' })
    @Post('signup')
    async signUp(@Body() payload: SignUpDto) {
        return await this.authService.signUp(payload);
    }

    @ApiOperation({ description: '회원 탈퇴' })
    @Delete('delete')
    async deleteUser(@Query('user_id') userId: number) {
        return await this.authService.deleteUser(userId);
    }

    @Post('jwt')
    @ApiBody({
        schema: {
            properties: {account : { example: 'test@test.com'}}
        }
    })
    async testJwt(@Body() body: { account: string }) {
        return await this.authService.testJwt(body.account);
    }
}