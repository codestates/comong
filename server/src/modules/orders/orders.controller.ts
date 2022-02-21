import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDetailDto } from './dto/create-orderdetail.dto';
import { UpdateOrderDetailDto } from './dto/update-orderdetail.dto';
import {
	ApiTags,
	ApiOkResponse,
	ApiHeader,
	ApiOperation,
	ApiQuery,
} from '@nestjs/swagger';
import JwtAuthGuard from '../../middleware/Jwtauthguard';

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
			example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf',
		},
	})
	@ApiOperation({
		summary: 'request for creating order',
		description: 'creating order for cart list',
	})
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
			example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf',
		},
	})
	@ApiOperation({
		summary: 'request for creating order_detail',
		description: 'creat order_detail',
	})
	// @UseGuards(JwtAuthGuard)
	createOrderDetail(@Body() createOrderdetail: CreateOrderDetailDto) {
		return this.ordersService.createOrderdetailandCart(createOrderdetail);
	}

	@Get('/cart')
	@ApiHeader({
		name: 'Authorization',
		description: '사용자 인증 수단, 액세스 토큰 값',
		required: true,
		schema: {
			example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf',
		},
	})
	@ApiOperation({
		summary: 'request for order_detail list',
		description: 'get order_detail list for shopping_cart by user_id',
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
	getorderDetails(@Query('user_id') user_id: number): Promise<object[]> {
		return this.ordersService.getorderDetails(user_id);
	}

	@Get('/')
	@ApiHeader({
		name: 'Authorization',
		description: '사용자 인증 수단, 액세스 토큰 값',
		required: true,
		schema: {
			example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf',
		},
	})
	@ApiOperation({
		summary: '회원, 배송상태, 주문 기간정보에 따른, 주문 내역 정보',
		description:
			'요청에 따라 주문내역을 가져옵니다. user_id 와 배송상태,  검색 기간을 지정할 수 있습니다. 배송상태와 기간이 없을경우  전체 상품을 표시합니다.',
	})
	@ApiQuery({
		name: 'user_id',
		required: true,
		description: '유저 아이디',
	})
	@ApiQuery({
		name: 'shipping_status',
		required: false,
		description: '배송 상태',
	})
	@ApiQuery({
		name: 'start',
		required: false,
		description: '검색기간 시작 시점 설정',
	})
	@ApiQuery({
		name: 'end',
		required: false,
		description: '검색기간 종료 시점 설정',
	})
	@ApiOkResponse({
		description: 'successful',
	})
	// @UseGuards(JwtAuthGuard)
	getOrders(
		@Query('user_id') user_id: number,
		@Query('shipping_status') shipping_status: string,
    @Query('start') start: string,
    @Query('end') end: string
	) {
		return this.ordersService.getOrders(user_id, shipping_status, start, end);
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.ordersService.findOne(+id);
	}

	@Patch('/orderdetail')
	@ApiHeader({
		name: 'Authorization',
		description: '사용자 인증 수단, 액세스 토큰 값',
		required: true,
		schema: {
			example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf',
		},
	})
	@ApiOperation({
		summary: 'order_detail update',
		description: '결제전 데이터 검증과 결재 와 DB 상의 일치를 위한 patch request',
	})
	// @UseGuards(JwtAuthGuard)
	updateOrderdetail(@Body() orderdetail: UpdateOrderDetailDto) {
		return this.ordersService.updateOrderdetail(orderdetail);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.ordersService.remove(+id);
	}
}
