import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { CreateOrderDetailDto } from './dto/create-orderdetail.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateOrderDetailDto } from './dto/update-orderdetail.dto';
import { MailerService } from '../mailer/mailer.service';
import { DeleteOrderdetailDto } from './dto/delete_orderdetail.dto';
import { AppGateway } from 'src/app.gateway';
import { CommentsModule } from '../comments/comments.module';
const { Op } = require('sequelize');
const models = require('../../models/index');
const Sequelize = models.sequelize;

@Injectable()
export class OrdersService {
	constructor(
		private readonly mailerService: MailerService,
		private readonly appGateway: AppGateway,
	) {}

	async create(createOrder: CreateOrderDto) {
		const result = await Sequelize.transaction(async (t) => {
			const newOrder = await models.order.create({
				id: String(createOrder.user_id) + '#' + String(new Date().getTime()),
				...createOrder,
				transaction: t,
			});
			const newJoindataArr: object[] = [];
			for (let elem of createOrder.order_detail_id) {
				let newJoinData: { dataValues: object } =
					await models.order_detail_has_order.create({
						order_detail_id: elem,
						order_id: newOrder.dataValues.id,
						transaction: t,
					});
				newJoindataArr.push(newJoinData.dataValues);
			}
			const itemInfo = await models.order_detail.findOne({
				include: { model: models.user, as: 'user' },
				where: {
					id: createOrder.order_detail_id[0],
				},
				transaction: t,
			});
			const sellerInfo = await models.item.findOne({
				include: { model: models.user, as: 'user' },
				where: {
					id: itemInfo.item_id,
				},
				transaction: t,
			});
			const emailAddress = sellerInfo.dataValues.user.email;
			const storeName = sellerInfo.dataValues.user.storename;
			// console.log(emailAddress)
			// console.log(storeName)
			if (newOrder) {
				// const message = newOrder;
				// this.appGateway.handleNotification(message);
				return await this.mailerService.sendOrderNotice(
					newOrder,
					{ storename: storeName },
					emailAddress,
					'COMONG 구매 발생 알림 메일',
					'order_notice',
				);
			} else {
				throw new BadRequestException('invalid request or value for property');
			}
		})
			.then((result: any) => {
				return result;
			})
			.catch((err: any) => {
				return err;
			});
		return result;
	}

	async updateOrder(data: UpdateOrderDto) {
		const result = await Sequelize.transaction(async (t) => {
			const isUpdate = await models.order.update(
				{
					...data,
				},
				{
					where: {
						id: data.order_id,
					},
					transaction: t,
				},
			);
			if (isUpdate[0] === 1) {
				return { message: 'update successful' };
			} else {
				throw new BadRequestException('invalid request or value for property');
			}
		})
			.then((result: any) => {
				return result;
			})
			.catch((err: any) => {
				return err;
			});
		return result;
	}

	async createOrderdetailandCart(createOrderdetail: CreateOrderDetailDto) {
		const result = await Sequelize.transaction(async (t) => {
			const newOrder_detail = await models.order_detail.create({
				...createOrderdetail,
				transaction: t,
			});
			if (newOrder_detail) {
				return { data: newOrder_detail, message: 'successful' };
			} else {
				throw new BadRequestException('invalid request or value for property');
			}
		})
			.then((result: any) => {
				return result;
			})
			.catch((err: any) => {
				return err;
			});
		return result;
	}

	async getorderDetails(user_id: number) {
		const result = await Sequelize.transaction(async (t) => {
			const cartData = await models.order_detail.findAll({
				include: [{ model: models.item, as: 'item' }],
				where: {
					user_id: user_id,
					status: 'pending',
				},
				transaction: t,
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
				transaction: t,
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
		})
			.then((result: any) => {
				return result;
			})
			.catch((err: any) => {
				return err;
			});
		return result;
	}

	async getOrders(
		user_id: number,
		shipping_status: string,
		start: string,
		end: string,
	) {
		const result = await Sequelize.transaction(async (t) => {
			if (!user_id) {
				throw new BadRequestException('at least user_id is needed for query');
			} else {
				const orderList = await models.order.findAll({
					where: {
						user_id: user_id,
						shipping_status: shipping_status
							? shipping_status
							: {
									[Op.or]: [
										'pending',
										'delivered',
										'processing',
										'paymentdue',
										'canceled',
										'returned',
										'pick-up available',
										'intransit',
									],
							  },
						createdAt: {
							[Op.gte]: start ? new Date(start) : new Date('1022-01-01'),
							[Op.lte]: end ? new Date(end) : new Date('3022-01-01'),
						},
					},
					transaction: t,
				});
				const paidOrderList = orderList.filter((elem) => {
					return elem.status === 'paid';
				});
				const orderIdArr = paidOrderList.map((elem) => {
					return elem.dataValues.id;
				});

				const orderJointableList = await models.order_detail_has_order.findAll({
					where: {
						order_id: {
							[Op.or]: [orderIdArr],
						},
					},
					transaction: t,
				});
				let output = {};
				for (let i = 0; i < paidOrderList.length; i++) {
					output[`order_id: ${paidOrderList[i].id}`] = {
						order_info: paidOrderList[i],
						order_detail_info: [],
					};
					for (let j = 0; j < orderJointableList.length; j++) {
						if (paidOrderList[i].id === orderJointableList[j].order_id) {
							const order_detail_info = await models.order_detail.findOne({
								include: [
									{
										model: models.user,
										as: 'user',
										attributes: ['id', 'storename', 'mobile'],
									},
								],
								where: {
									id: orderJointableList[j].order_detail_id,
								},
								transaction: t,
							});
							const item_info = await models.item.findOne({
								where: {
									id: order_detail_info.dataValues.item_id,
								},
								transaction: t,
							});
							output[`order_id: ${paidOrderList[i].id}`][
								'order_detail_info'
							].push({
								order_detail_info,
								item_info,
							});
						}
					}
				}
				// const message = output;
				// this.appGateway.handleNotification(message);
				return output;
			}
		})
			.then((result: any) => {
				return result;
			})
			.catch((err: any) => {
				return err;
			});
		return result;
	}

	async getSellorOrders(
		user_id: number,
		shipping_status: string,
		start: string,
		end: string,
	) {
		const result = await Sequelize.transaction(async (t) => {
			if (!user_id) {
				throw new BadRequestException('at least user_id is needed for query');
			} else {
				const selleritemlist = await models.item.findAll({
					where: {
						user_id: user_id,
					},
					transaction: t,
				});
				const selleritemIdArr = selleritemlist.map((elem) => {
					return elem.id;
				});
				const sellerOrderDetailList = await models.order_detail.findAll({
					where: {
						item_id: {
							[Op.or]: [selleritemIdArr],
						},
					},
					transaction: t,
				});
				const sellerOrderDetailArr = sellerOrderDetailList.map((elem) => {
					return elem.id;
				});
				const orderJoinList = await models.order_detail_has_order.findAll({
					where: {
						order_detail_id: {
							[Op.or]: [sellerOrderDetailArr],
						},
					},
					transaction: t,
				});
				const sellerOrderIdArr = orderJoinList.map((elem) => {
					return elem.order_id;
				});
				let setSellerOrderIdArr = new Set(sellerOrderIdArr);
				let uniqueSellerOrderIdArr = [...setSellerOrderIdArr];

				const orderList = await models.order.findAll({
					where: {
						id: {
							[Op.or]: [uniqueSellerOrderIdArr],
						},
						shipping_status: shipping_status
							? shipping_status
							: {
									[Op.or]: [
										'pending',
										'delivered',
										'processing',
										'paymentdue',
										'canceled',
										'returned',
										'pick-up available',
										'intransit',
									],
							  },
						createdAt: {
							[Op.gte]: start ? new Date(start) : new Date('1022-01-01'),
							[Op.lte]: end ? new Date(end) : new Date('3022-01-01'),
						},
					},
					transaction: t,
				});
				const orderIdArr = orderList.map((elem) => {
					return elem.dataValues.id;
				});
				// console.log(orderList)
				const orderJointableList = await models.order_detail_has_order.findAll({
					where: {
						order_id: {
							[Op.or]: [orderIdArr],
						},
					},
					transaction: t,
				});
				let output = {};
				for (let i = 0; i < orderList.length; i++) {
					output[`order_id: ${orderList[i].id}`] = {
						order_info: orderList[i],
						order_detail_info: [],
					};
					for (let j = 0; j < orderJointableList.length; j++) {
						if (orderList[i].id === orderJointableList[j].order_id) {
							const order_detail_info = await models.order_detail.findOne({
								include: [
									{
										model: models.user,
										as: 'user',
										attributes: ['id', 'storename', 'mobile'],
									},
								],
								where: {
									id: orderJointableList[j].order_detail_id,
								},
								transaction: t,
							});
							const item_info = await models.item.findOne({
								include: [
									{
										model: models.item_inventory,
										as: 'item_inventories',
										attributes: ['stock'],
									},
								],
								where: {
									id: order_detail_info.dataValues.item_id,
								},
								transaction: t,
							});
							output[`order_id: ${orderList[i].id}`]['order_detail_info'].push({
								order_detail_info,
								item_info,
							});
						}
					}
				}
				const message = output;
				this.appGateway.handleNotification(message);
				return output;
			}
		})
			.then((result: any) => {
				return result;
			})
			.catch((err: any) => {
				return err;
			});
		return result;
	}

	findOne(id: number) {
		return `This action returns a #${id} order`;
	}

	async updateOrderdetail(updateOrderdetail: UpdateOrderDetailDto) {
		const result = await Sequelize.transaction(async (t) => {
			for (let i = 0; i < updateOrderdetail.data.length; i++) {
				const order_detail = await models.order_detail.findOne({
					where: {
						id: updateOrderdetail.data[i].id,
					},
					transaction: t,
				});
				if (
					updateOrderdetail.data[i].item_id === order_detail.item_id &&
					updateOrderdetail.data[i].peritem_price === order_detail.peritem_price
				) {
					await models.order_detail.update(
						{
							order_amount: updateOrderdetail.data[i].order_amount,
						},
						{
							where: {
								id: updateOrderdetail.data[i].id,
							},
							transaction: t,
						},
					);
				} else {
					throw new BadRequestException(
						`order_detail_id: ${updateOrderdetail.data[i].id} has Data Disaccord`,
					);
				}
			}
			return { message: 'updates implemented successfully' };
		})
			.then((result: any) => {
				return result;
			})
			.catch((err: any) => {
				return err;
			});
		return result;
	}

	async removeCart(order_detail_id: DeleteOrderdetailDto) {
		const result = await Sequelize.transaction(async (t) => {
			const isDestroyed = await models.order_detail.destroy({
				where: {
					id: order_detail_id.order_detail_id,
				},
				transaction: t,
			});
			if (isDestroyed === 1) {
				return {
					message: `order_detail_id:${order_detail_id.order_detail_id} destroyed`,
				};
			} else {
				throw new BadRequestException(
					`order_detail_id: ${order_detail_id.order_detail_id} has no Data or Data Disaccord`,
				);
			}
		})
			.then((result: any) => {
				return result;
			})
			.catch((err: any) => {
				return err;
			});
		return result;
	}
}
