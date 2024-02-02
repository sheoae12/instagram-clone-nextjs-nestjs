import { Body, Controller, Delete, Get, Injectable, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FeedService } from "./feed.service";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateFeedDto } from "./dto/req/create-feed.dto";
import { UpdateFeedDto } from "./dto/req/update-feed.dto";
import { FeedActionDto } from "./dto/req/feed-action.dto";
import { RetrieveFeedDto } from "./dto/req/retrieve-feed.dto";
import { ResponseInterceptor } from "src/common/interceptor/response.interceptor";
import { UserAuthGuard } from "src/common/guard/user-auth.guard";

@ApiTags('피드 관련 API')
@UseInterceptors(ResponseInterceptor)
@Controller('feed')
export class FeedController {
    constructor(private readonly feedService: FeedService) {}

    @ApiOperation({ description: '피드 생성' })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    @Post()
    async createFeed(
        @UploadedFile() file: Express.Multer.File,
        @Body() payload: CreateFeedDto
    ) {
        return await this.feedService.createFeed(file, payload);
    }

    @ApiOperation({ description: '전체 피드 조회' })
    @Get()
    async getAllFeeds(@Query('uid') uid: string) {
        return await this.feedService.getAllFeeds(uid);
    }

    @ApiOperation({ description: '유저 피드 조회' })
    @Get('usr')
    async getUserFeeds(@Query() payload: RetrieveFeedDto ) {
        return await this.feedService.getUserFeeds(payload);
    }

    @ApiOperation({ description: '피드 삭제' })
    @Delete()
    async deleteFeed(@Query('id', ParseIntPipe) feedId: number) {
        return await this.feedService.deleteFeed(feedId);
    }

    @ApiOperation({ description: '피드 수정' })
    @Put()
    async updateFeed(@Body() payload: UpdateFeedDto) {
        return await this.feedService.updateFeed(payload);
    }

    @ApiOperation({ description: '이미지 업로드 테스트' })
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
              file: {
                type: 'file',
                format: 'binary',
              },
            },
        },
      })
    @UseInterceptors(FileInterceptor('file'))
    @Post('upload-test')
    async uploadFeedImage(
        @UploadedFile() file: Express.Multer.File,
        @Body() payload: any
    ) {
        return await this.feedService.uploadFeedImage(file, payload)
    }

    @ApiOperation({ description: '피드 좋아요 목록 조회' })
    @Get(':feedId/like')
    async getFeedLikeList(@Param('feedId', ParseIntPipe) feedId: number) {
        return await this.feedService.getFeedLikeList(feedId);
    }

    @ApiOperation({ description: '피드 좋아요 생성' })
    @Post('like')
    async likeFeed(@Body() payload: FeedActionDto) {
        return await this.feedService.likeFeed(payload);
    }

    @ApiOperation({ description: '피드 좋아요 해제' })
    @Delete('like')
    async unlikeFeed(@Body() payload: FeedActionDto) {
        return await this.feedService.unlikeFeed(payload);
    }

    @ApiOperation({ description: '피드 북마크 등록' })
    @Post('bookmark')
    async bookmarkFeed(@Body() payload: FeedActionDto) {
        return await this.feedService.bookmarkFeed(payload);
    }

    @ApiOperation({ description: '피드 북마크 해제' })
    @Delete('bookmark')
    async unbookmarkFeed(@Body() payload: FeedActionDto) {
        return await this.feedService.unbookmarkFeed(payload);
    }
}