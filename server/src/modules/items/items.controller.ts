import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { category } from './entities/category.entity';
import { item } from './entities/item.entity'
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiHeader, ApiBearerAuth, ApiBadRequestResponse, ApiParam, ApiQuery, ApiServiceUnavailableResponse } from '@nestjs/swagger';
import JwtAuthGuard from '../../middleware/Jwtauthguard';
import { getUser } from 'src/decorators/getUser';
import { User } from '../users/entities/user.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { StockManagement } from './dto/stockmanagement.dto';
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
  @ApiServiceUnavailableResponse({ description: 'a network-related or database instance-specific error occurred while inserting new data' })
  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
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
  @ApiQuery({
    name: 'startindex',
    required: false,
    description: '시작 인덱스 id'
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
  getItems(@Query('category') category: number, @Query('number') number: number, @Query('keyword') key: string, @Query('startindex') startindex: number): Promise<item[]> {
    return this.itemsService.getItems(+category, +number, key, +startindex);
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
  getDetails(@Param('id') id: number): Promise<item> {
    return this.itemsService.getDetails(+id)
  }

  @Get('comments/:id')
  @ApiOperation({ summary: '상품의 리뷰 정보', description: '특정 상품의 리뷰 정보를 요청합니다.' })
  @ApiParam({
    name: 'id',
    required: true,
    description: '상품 id'
  })
  getComments(@Param('id') id: number): Promise<any>{
    return this.itemsService.getComments(+id)
  }


  @Get('categorylist')
  @ApiOperation({ summary: '카테고리 목록 정보', description: 'request for item category list' })
  @ApiOkResponse({ description: 'successful'})
  getCategoryList(): Promise<category[]> {
    return this.itemsService.getCategoryList();
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
  @ApiServiceUnavailableResponse({ description: 'a network-related or database instance-specific error occurred while inserting new data' })
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
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

  @Get('/bookmark')
	@ApiHeader({
		name: 'Authorization',
		description: '사용자 인증 수단, 액세스 토큰 값',
		required: true,
		schema: {
			example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf',
		},
	})
	@ApiOperation({
		summary: '북마크 리스트',
		description: '북마크 리스트 요청 by user_id',
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
	getbookmarks(@Query('user_id') user_id: number) {
		return this.itemsService.getbookmarks(user_id);
	}

  
  @Get('/keyword')
	@ApiHeader({
    name: 'Authorization',
		description: '사용자 인증 수단, 액세스 토큰 값',
		required: true,
		schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf',
		},
	})
	@ApiOperation({
    summary: 'keyword 리스트',
		description: '추천 검색어 keyword 리스트 요청',
	})
	@ApiOkResponse({
    description: 'successful',
	})
	// @UseGuards(JwtAuthGuard)
	getkeywords() {
    return this.itemsService.getkeywords();
	}
  
  @Post('/stockmanagement')
  @ApiHeader({
    name: 'Authorization',
    description: '사용자 인증 수단, 액세스 토큰 값',
    required: true,
    schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf'
    },
  })
  // @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: '개발용 재고입력 기능', description: '개발 단계에서 테스트를 위한 재고 입력' })
  @ApiCreatedResponse({ description: 'successful' })
  stockmanagement(@Body() data: StockManagement) {
    return this.itemsService.stockmanagement(data)
  }

  @Get('/selling')
  getSellingItems() {
    return this.itemsService.getSellingItems()
  }

  @Get('/category-inferred')
  inferCategory(@Query('title') title: string) {
    return this.itemsService.inferCategory(title)
  }

  @Get('/peakstuff')
  getPeakStuff() {
    return this.itemsService.getPeakStuff()
  }

}