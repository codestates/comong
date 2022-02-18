import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderDetailDto } from './dto/create-orderdetail.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
const models = require('../../models/index');

@Injectable()
export class OrdersService {
	async create(createOrder: CreateOrderDto) {
		console.log(createOrder);
		const newOrder = await models.order.create({
			...createOrder,
		});
		console.log(newOrder.dataValues.id);
		const newJoindataArr: object[] = [];
		for (let elem of createOrder.order_detail_id) {
			let newJoinData: { dataValues: object } =
				await models.order_detail_has_order.create({
					order_detail_id: elem,
					order_id: newOrder.dataValues.id,
				});
			newJoindataArr.push(newJoinData.dataValues);
		}
		if (newOrder) {
			return { data: {newOrder, newJoindataArr}, message: 'successful' };
		} else {
			throw new BadRequestException('invalid request or value for property');
		}
	}

	async createOrderdetailandCart(createOrderdetail: CreateOrderDetailDto) {
		const newOrder_detail = await models.order_detail.create({
			...createOrderdetail,
		});
		console.log(newOrder_detail);
		if (newOrder_detail) {
			return { data: newOrder_detail, message: 'successful' };
		} else {
			throw new BadRequestException('invalid request or value for property');
		}
		//stock management function will be added soon..
	}

	async getorderDetails(user_id: number) {
		const cartData = await models.order_detail.findAll({
			where: {
				user_id: user_id,
				status: 'pending'
			},
		});
		return cartData;
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
