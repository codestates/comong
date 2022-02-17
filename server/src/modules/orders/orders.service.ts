import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderDetailDto } from './dto/create-orderdetail.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
const models = require('../../models/index');

@Injectable()
export class OrdersService {
	create(createOrderDto: CreateOrderDto) {
		return 'This action adds a new order';
	}

	createShipping(createOrderDto: CreateOrderDto) {
		return 'This action will create a new shipping data';
	}

	async createOrderdetailandCart(createOrderdetail: CreateOrderDetailDto) {
		const newOrder_detail= await models.order_detail.create({
      order_amount: createOrderdetail.order_amount,
      peritem_price: createOrderdetail.peritem_price,
      status: createOrderdetail.status,
      user_id: createOrderdetail.user_id,
      item_id: createOrderdetail.item_id,
    });
		console.log(newOrder_detail);
		if (newOrder_detail) {
			return { data: newOrder_detail, message: 'successful' };
		} else {
			throw new BadRequestException('invalid value for property');
		}
		//stock management function will be added soon..
	}

	findAll() {
		return `This action returns all orders`;
	}

	findOne(id: number) {
		return `This action returns a #${id} order`;
	}

	update(id: number, updateOrderDto: UpdateOrderDto) {
		return `This action updates a #${id} order`;
	}

	remove(id: number) {
		return `This action removes a #${id} order`;
	}
}
