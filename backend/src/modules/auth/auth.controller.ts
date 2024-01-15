import { Body, Controller, Delete, Post, Query } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dto/sign-in.dto";
import { ApiTags } from "@nestjs/swagger";
import { SignUpDto } from "./dto/sign-up.dto";

@ApiTags('유저인증 API')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin/common')
    async signIn(@Body() payload: SignInDto) {
        return await this.authService.signIn(payload);
    }

    @Post('signin/facebook')
    async facebookSignIn(@Body() payload: any) {
        return await this.authService.facebookSignIn(payload);
    }

    @Post('signup')
    async signUp(@Body() payload: SignUpDto) {
        return await this.authService.signUp(payload);
    }

    @Delete('delete')
    async deleteUser(@Query('user_id') userId: number) {
        return await this.authService.deleteUser(userId);
    }
}