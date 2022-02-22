import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { category } from './entities/category.entity';
import { item } from './entities/item.entity'
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiHeader, ApiBearerAuth, ApiBadRequestResponse, ApiParam, ApiQuery } from '@nestjs/swagger';
import JwtAuthGuard from '../../middleware/Jwtauthguard';
import { getUser } from 'src/decorators/getUser';
import { User } from '../users/entities/user.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { CreateItemReviewDto } from './dto/create-itemreview.dto';
import { DeleteItemReviewDto } from './dto/delete-itemreview.dto';
import { UpdateItemReviewDto } from './dto/update-itemreview.dto';
//import { Auth } from '../../middleware/auth';

@Controller('items')
@ApiTags('상품 정보 관련')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @ApiHeader({
    name: 'Authorization',
    description: '사용자 인증 수단, 액세스 토큰 값',
    required: true,
    schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf'
    },
  })
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '새로운 상품 등록', description: '새로운 상품을 등록합니다.' })
  @ApiCreatedResponse({ description: 'successful' })
  @ApiBadRequestResponse({ description: 'invalid value for property' })
  @UseGuards(JwtAuthGuard)
  create(@Body() newItem: CreateItemDto, @getUser() user: User ) {
    return this.itemsService.create(newItem, user);
  }

  @Post('/imageuploadurl')
  @ApiOperation({ summary: 'get url for image upload', description: 'getting a url for direct upload images' })
  @ApiCreatedResponse({ description: 'successful' })
  getimageuploadurl() {
    return this.itemsService.getimageuploadurl()
  }

  @Get('/')
  @ApiOperation({ summary: '상품 검색 혹은 카테고리 별, 추천 알고리즘에 따른 상품 정보', description: '요청에 따라 상품 목록을 가져옵니다. 카테고리와 요청 갯수 혹은 검색 키워드를 지정할 수 있습니다. 그렇지 않을 경우 추천알고리즘에 따라 상품을 표시합니다.' })
  @ApiQuery({
    name: 'category',
    required: false,
    description: '카테고리'
  })
  @ApiQuery({
    name: 'keyword',
    required: false,
    description: '검색 키워드'
  })
  @ApiQuery({
    name: 'number',
    required: false,
    description: '요청할 갯수'
  })
  @ApiOkResponse({
    description: 'successful',
    schema: {
      example: {
        id: '1',
        title: 'Comong 코끼리 인형 + 100cm 바디필로우 세트',
        contents: '귀여움',
        thumbnail: 'https://imagedelivery.net/BOKuAiJyROlMLXwCcBYMqQ/fe9f218d-5134-4a76-ba20-bf97e5c21900/thumbnail',
        category: 1,
        price: 59000,
        },
    },
  })
  getItems(@Query('category') category: number, @Query('number') number: number, @Query('keyword') key: string): Promise<item[]> {
    return this.itemsService.getItems(+category, +number, key);
  }

  @Get('/details/:id')
  @ApiOperation({ summary: '상품 상세 정보', description: '해당 상품의 상세 정보를 요청합니다.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '상품 Id'
  })
  @ApiOkResponse({
    description: 'successful',
    schema: {
      example: {
        "id": 999,
        "title": "미래생활 순수PURE천연펄프 25m 30롤 x 3팩",
        "contents": "미래생활 순수PURE천연펄프 25m 30롤 x 3팩",
        "price": 26900,
        "image_src": "http://gdimg.gmarket.co.kr/1899274105/still/600?ver=1642724241",
        "user_id": 116,
        "createdAt": "2022-02-16T07:59:25.000Z",
        "updatedAt": "2022-02-16T07:59:25.000Z",
        "user_storename": "TEST STORENAME",
        "category_id": 4,
        "category": "생활용품"
      }
    }
  })
  getDetails(@Param('id') id: number): Promise<item[]> {
    return this.itemsService.getDetails(+id)
  }


  @Get('categorylist')
  @ApiOperation({ summary: '카테고리 목록 정보', description: 'request for item category list' })
  @ApiOkResponse({ description: 'successful'})
  getCategoryList(): Promise<category[]> {
    return this.itemsService.getCategoryList();
  }

  @Patch('/itemreview')
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
    return this.itemsService.patchItemreview(data)
  }

  @Patch(':id')
  @ApiHeader({
    name: 'Authorization',
    description: '사용자 인증 수단, 액세스 토큰 값',
    required: true,
    schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf'
    },
  })
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '상품 정보 수정', description: '상품 정보 수정 요청을 받습니다.' })
  @ApiOkResponse({ description: 'successful'})
  @ApiBadRequestResponse({ description: 'invalid value for property' })
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete('/itemreview')
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
    return this.itemsService.removeItemreview(item_review_id);
  }

  @Delete('/:id')
  @ApiHeader({
    name: 'Authorization',
    description: '사용자 인증 수단, 액세스 토큰 값',
    required: true,
    schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf'
    },
  })
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '상품 삭제', description: '상품 삭제 요청을 받습니다.' })
  @ApiOkResponse({ description: 'successful'})
  @ApiBadRequestResponse({ description: 'invalid value for property' })
  remove(@Param('id') id: string) {
    return this.itemsService.remove(+id);
  }

  @Post('/bookmark')
  @ApiHeader({
    name: 'Authorization',
    description: '사용자 인증 수단, 액세스 토큰 값',
    required: true,
    schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf'
    },
  })
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '북마크 추가', description: '원하는 상품에 대한 북마크 추가요청' })
  @ApiCreatedResponse({ description: 'successful' })
  createBookmark(@Body() data: CreateBookmarkDto) {
    return this.itemsService.createBookmark(data)
  }

  @Post('/itemreview')
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
    return this.itemsService.createItemreview(data)
  }


  @Get('/itemreview')
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
  @ApiOperation({ summary: '구매후기 리스트', description: '구매한 상품에 대한후기 리스트 요청' })
  @ApiCreatedResponse({ description: 'successful' })
  getItemReview(@Query('user_id') user_id: number) {
    return this.itemsService.getItemreview(user_id)
  }

}