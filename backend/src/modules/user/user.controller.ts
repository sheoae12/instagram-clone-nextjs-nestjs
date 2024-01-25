import { Body, Controller, Get, Injectable, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { UserService } from "./user.service";
import { SetProfileDto } from "./dto/req/set-profile.dto";

@ApiTags('유저 일반 API')
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @ApiOperation({ description: '유저 프로필 설정' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    @Post('profile')
    async setProfile(
        @UploadedFile() file: Express.Multer.File,
        @Body() payload: SetProfileDto
    ) {
        return await this.userService.setProfile(file, payload);
    }

    @ApiOperation({ description: '유저 프로필 조회' })
    @Get('profile')
    async viewProfile(
        @Query('uid') uid: string
    ) {
        return await this.userService.viewProfile(uid);
    }
}