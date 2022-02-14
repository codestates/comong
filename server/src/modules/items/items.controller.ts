import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { category } from './entities/category.entity';
import { item } from './entities/item.entity'
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiHeader, ApiBearerAuth, ApiBadRequestResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

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
  create(@Body() createItemDto: CreateItemDto) {
    return this.itemsService.create(createItemDto);
  }

  @Get('/')
  @ApiOperation({ summary: '상품 정보 목록(구현)', description: '요청에 따라 상품 목록을 가져옵니다. 카테고리와 요청 갯수를 지정할 수 있습니다. 그렇지 않을 경우 추천알고리즘에 따라 상품을 표시합니다.' })
  @ApiQuery({
    name: 'category',
    required: false,
    description: '카테고리'
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
  getItems(@Query('category') category: number , @Query('number') number: number): Promise<item[]> {
    return this.itemsService.getItems(+category,+number);
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
  update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return this.itemsService.update(+id, updateItemDto);
  }

  @Delete(':id')
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

}
