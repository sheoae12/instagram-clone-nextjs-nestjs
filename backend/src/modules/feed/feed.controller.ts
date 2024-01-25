import { Body, Controller, Get, Injectable, Post, Query, UploadedFile, UseInterceptors } from "@nestjs/common";
import { FeedService } from "./feed.service";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateFeedDto } from "./dto/req/create-feed.dto";

@ApiTags('피드 관련 API')
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

    @ApiOperation({ description: '유저 피드 조회' })
    @Get()
    async getUserFeed(@Query('uid') uid: string) {
        return await this.feedService.getUserFeed(uid);
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
}