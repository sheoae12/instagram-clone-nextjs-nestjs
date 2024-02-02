import { Body, Controller, Delete, Get, Injectable, Post, Put, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { UserService } from "./user.service";
import { SetProfileDto } from "./dto/req/set-profile.dto";
import { ResponseInterceptor } from "src/common/interceptor/response.interceptor";
import { FollowUserDto } from "./dto/req/follow-user.dto";

@ApiTags('유저 일반 API')
@UseInterceptors(ResponseInterceptor)
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

    @ApiOperation({ description: '팔로우 목록' })
    @Get('follower')
    async getFollowers(@Query('uid') uid: string) {
        return await this.userService.getFollowers(uid);
    }

    @ApiOperation({ description: '팔로잉 목록' })
    @Get('following')
    async getFollowings(@Query('uid') uid: string) {
        return await this.userService.getFollowings(uid);
    }

    // target user에게 친구추가 요청 들어가야함
    // 알림을 어떻게 구현할지 생각해 봐야할듯
    // 소켓??
    // 컨트롤러에서 게이트웨이로 이벤트 에밋가능
    @ApiOperation({ description: '유저 팔로우' })
    @Post('follow')
    async followUser(@Body() payload: FollowUserDto) {
        return await this.userService.followUser(payload);
    }

    // 친구추가 요청 수락
    @ApiOperation({ description: '유저 팔로우 수락' })
    @Put('follow')
    async acceptFollow(@Body() payload: FollowUserDto) {
        return await this.userService.acceptFollow(payload);
    }

    @ApiOperation({ description: '유저 언팔로우' })
    @Delete('unFollow')
    async unfollowUser(@Body() payload: FollowUserDto) {
        return await this.userService.unfollowUser(payload);
    }
}