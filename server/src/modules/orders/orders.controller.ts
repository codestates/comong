import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags,ApiOkResponse, ApiHeader, ApiOperation, ApiQuery } from '@nestjs/swagger';
import JwtAuthGuard from '../../middleware/Jwtauthguard';
import { CreateOrderDetailDto } from './dto/create-orderdetail.dto';

@Controller('orders')
@ApiTags('주문 정보 관련')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @ApiHeader({
    name: 'Authorization',
    description: '사용자 인증 수단, 액세스 토큰 값',
    required: true,
    schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf'
    },
  })
  @ApiOperation({ summary: 'request for creating order', description: 'creating order for payment' })
  // @UseGuards(JwtAuthGuard)
  create(@Body() createOrder: CreateOrderDto) { 
    return this.ordersService.create(createOrder);
  }

  @Post('/orderdetail')
  @ApiHeader({
    name: 'Authorization',
    description: '사용자 인증 수단, 액세스 토큰 값',
    required: true,
    schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf'
    },
  })
  @ApiOperation({ summary: 'request for creating order_detail', description: 'creat order_detail' })
  // @UseGuards(JwtAuthGuard)
  createOrderDetail(@Body() createOrderdetail: CreateOrderDetailDto) {
    return this.ordersService.createOrderdetailandCart(createOrderdetail);
  }

  @Get('/cart')
  @ApiOperation({ summary: 'request for order_detail list', description: 'get order_detail list for shopping_cart by user_id' })
  @ApiQuery({
    name: 'user_id',
    required: true,
    description: '유저 아이디'
  })
  @ApiOkResponse({
    description: 'successful',
  })
  getorderDetails(@Query('user_id') user_id: number): Promise<string> {
    return this.ordersService.getorderDetails(user_id);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(+id, updateOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ordersService.remove(+id);
  }
}
