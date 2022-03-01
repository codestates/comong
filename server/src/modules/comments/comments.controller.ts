import { Controller, Get, Post, Body, Patch, Query, Delete, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiHeader, ApiBadRequestResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import JwtAuthGuard from '../../middleware/Jwtauthguard';
import { CreateItemReviewDto } from './dto/create-comment.dto';
import { UpdateItemReviewDto } from './dto/update-comment.dto';
import { DeleteItemReviewDto } from './dto/delete-commnet.dto';

@Controller('comments')
@ApiTags('상품 문의 및 후기 관련')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('/')
  @ApiHeader({
    name: 'Authorization',
    description: '사용자 인증 수단, 액세스 토큰 값',
    required: true,
    schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf'
    },
  })
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '구매리뷰 추가', description: '구매한 상품에 대한 구매후기 추가 요청' })
  @ApiCreatedResponse({ description: 'successful' })
  createItemReview(@Body() data: CreateItemReviewDto) {
    return this.commentsService.createItemreview(data)
  }

  @Get('/user')
  @ApiHeader({
    name: 'Authorization',
    description: '사용자 인증 수단, 액세스 토큰 값',
    required: true,
    schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf'
    },
  })
	@ApiQuery({
		name: 'user_id',
		required: true,
		description: '유저 아이디',
	})
	@ApiOkResponse({
		description: 'successful',
	})
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '구매후기 리스트/구매자 정보창 기준', description: '구매한 상품에 대한후기 리스트 요청' })
  @ApiCreatedResponse({ description: 'successful' })
  getUserItemReview(@Query('user_id') user_id: number) {
    return this.commentsService.getUserItemReview(user_id)
  }

  @Get('/itemlist')
  @ApiHeader({
    name: 'Authorization',
    description: '사용자 인증 수단, 액세스 토큰 값',
    required: true,
    schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf'
    },
  })
	@ApiQuery({
		name: 'item_id',
		required: true,
		description: 'item 아이디',
	})
	@ApiOkResponse({
		description: 'successful',
	})
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '구매후기 리스트/상품 상세 화면 기준', description: '구매한 상품에 대한후기 리스트 요청' })
  @ApiCreatedResponse({ description: 'successful' })
  getListItemreview(@Query('item_id') item_id: number) {
    return this.commentsService.getListItemreview(item_id)
  }

  @Patch('/')
  @ApiHeader({
    name: 'Authorization',
    description: '사용자 인증 수단, 액세스 토큰 값',
    required: true,
    schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf'
    },
  })
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '구매리뷰 수정', description: '구매한 상품에 대한 구매후기 수정 요청' })
  @ApiCreatedResponse({ description: 'successful' })
  patchItemReview(@Body() data: UpdateItemReviewDto) {
    return this.commentsService.patchItemreview(data)
  }

  @Delete('/')
  @ApiHeader({
    name: 'Authorization',
    description: '사용자 인증 수단, 액세스 토큰 값',
    required: true,
    schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf'
    },
  })
  @ApiOperation({ summary: '구매 리뷰 삭제', description: 'item_review 삭제 요청을 받습니다.' })
  @ApiOkResponse({ description: 'successful'})
  // @UseGuards(JwtAuthGuard)
  @ApiBadRequestResponse({ description: 'invalid value for property' })
  removeItemreview(@Body() item_review_id: DeleteItemReviewDto) {
    return this.commentsService.removeItemreview(item_review_id);
  }
}
