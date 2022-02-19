import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderDetailDto } from './dto/create-orderdetail.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { MailerService } from '../mailer/mailer.service';
const { Op } = require('sequelize');
const models = require('../../models/index');

@Injectable()
export class OrdersService {
	constructor(private readonly mailerService: MailerService) {}

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
		const getUserdata = await models.user.findOne({
			where: {
				id: createOrder.user_id,
			},
		});
		const emailAddress = getUserdata.dataValues.email;
		const storeName = getUserdata.dataValues.storename;
		if (newOrder) {
			return await this.mailerService.sendOrderNotice(
				{ storename: storeName },
				emailAddress,
				'COMONG 구매 발생 알림 메일',
				'order_notice',
			);
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
			include: [{ model: models.item, as: 'item' }],
			where: {
				user_id: user_id,
				status: 'pending',
			},
		});
		let storeuserIdArr: number[] = cartData.map((elem) => {
			return elem.dataValues.item.user_id;
		});
		let setStoreUserIdArr = new Set(storeuserIdArr);
		let uniqueStoreUserIdArr = [...setStoreUserIdArr];

		const storeList = await models.user.findAll({
			where: {
				id: {
					[Op.or]: [uniqueStoreUserIdArr],
				},
			},
		});
		let output: object = {};
		for (let i = 0; i < uniqueStoreUserIdArr.length; i++) {
			output[`group_${uniqueStoreUserIdArr[i]}`] = {
				storeInfo: storeList[i],
				order_details: [],
			};
			for (let j = 0; j < cartData.length; j++) {
				if (cartData[j].dataValues.item.user_id === uniqueStoreUserIdArr[i]) {
					output[`group_${uniqueStoreUserIdArr[i]}`]['order_details'].push(
						cartData[j],
					);
				}
			}
		}

		return [output];
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
