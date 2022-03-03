import * as dotenv from 'dotenv';
dotenv.config();

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { MailerService } from '../mailer/mailer.service';
import { AppGateway } from 'src/app.gateway';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const { Op } = require('sequelize');
const models = require('../../models/index');
const Sequelize = models.sequelize;

@Injectable()
export class PaymentsService {
	constructor(
		private readonly mailerService: MailerService,
		private readonly appGateway: AppGateway,
	) {}
	async create(createPaymentDto: CreatePaymentDto) {
		const result = await Sequelize.transaction(async (t) => {
			// console.log(createPaymentDto);
			if (createPaymentDto.status === 'paid') {
				const validationData = await this.paymentValidator(
					createPaymentDto.imp_uid,
				);
				// console.log(validationData);
				const { amount } = validationData;
				if (amount === createPaymentDto.total_amount) {
					const [user_payment, isCreated] =
						await models.user_payment.findOrCreate({
							where: { order_id: createPaymentDto.order_id },
							defaults: createPaymentDto,
							transaction: t,
						});
					if (isCreated) {
						const orderUpdate = await models.order.update(
							{
								status: 'paid',
								address_line1: createPaymentDto.address_line1,
								address_line2: createPaymentDto.address_line2,
								postal_code: createPaymentDto.postal_code,
								email: createPaymentDto.email,
								contact: createPaymentDto.contact,
								buyer_name: createPaymentDto.buyer_name,
							},
							{
								where: {
									id: createPaymentDto.order_id,
								},
								transaction: t,
							},
						);
						const listforUpdate = await models.order_detail_has_order.findAll({
							where: { order_id: createPaymentDto.order_id },
							transaction: t,
						});
						let updateList: number[] = listforUpdate.map((elem) => {
							return elem.dataValues.order_detail_id;
						});
						const orderDetailUpdate = await models.order_detail.update(
							{
								status: 'paid',
							},
							{
								where: {
									id: {
										[Op.or]: [updateList],
									},
								},
								transaction: t,
							},
						);
						const user = await models.user.findOne({
							where: {
								id: createPaymentDto.user_id,
							},
							transaction: t,
						});
						const order_detailList = await models.order_detail.findAll({
							where: {
								id: {
									[Op.or]: [updateList],
								},
							},
							transaction: t,
						});
						const itemIdArr = order_detailList.map((elem) => {
							return elem.item_id;
						});
						const itemList = await models.item.findAll({
							where: {
								id: {
									[Op.or]: [itemIdArr],
								},
							},
							transaction: t,
						});
						const message = {
							title: '결재 발생 알림',
							data: user_payment,
							itemInfo: itemList,
						};
						const sellerId = itemList[0].user_id;
						const pushNotificationRoom = `${sellerId}#appNotice`;
						const newNotification = await models.notification.create(
							{
								title: '결재 발생 알림',
								contents: JSON.stringify(message),
								read: 0,
								user_id: sellerId,
							},
							{ transaction: t },
						);
						this.appGateway.handleNotification(pushNotificationRoom, message);
						const itemTitleArr = itemList.map((elem) => {
							return elem.title;
						});
						for (let i = 0; i < order_detailList.length; i++) {
							await models.item_inventory.decrement(
								{
									stock: order_detailList[i].order_amount,
								},
								{
									where: { item_id: order_detailList[i].item_id },
									transaction: t,
								},
							);
						}
						//paymentTime
						const paymentTime = new Date(validationData.paid_at);
						validationData['paymentTime'] = paymentTime;
						//itemTitle
						if (itemTitleArr.length === 1) {
							const itemTitle = itemTitleArr[0];
							validationData['itemTitle'] = itemTitle;
						} else {
							const itemTitle = `${itemTitleArr[0]} 외 ${
								itemTitleArr.length - 1
							}건`;
							validationData['itemTitle'] = itemTitle;
						}
						//card_quota
						if (validationData.card_quota === 0) {
							validationData['card_quota'] = '일시불';
						} else {
							validationData[
								'card_quota'
							] = `${validationData.card_quota} 개월`;
						}

						const emailAddress = user.email;
						return await this.mailerService.sendPaymentNotice(
							user_payment,
							validationData,
							emailAddress,
							'COMONG 결제 알림 메일',
							'payment_notice',
						);
					} else {
						return {
							message: `payment data of 'order_id: ${createPaymentDto.order_id}' exist`,
						};
					}
				} else {
					return { status: 'forgery', message: 'FORGERY WARNING' };
				}
			} else {
				return { message: 'the payment is under PENDING STATUS' };
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

	findAll() {
		return `This action returns all payments`;
	}

	findOne(id: number) {
		return `This action returns a #${id} payment`;
	}

	update(id: number, updatePaymentDto: UpdatePaymentDto) {
		return `This action updates a #${id} payment`;
	}

	remove(id: number) {
		return `This action removes a #${id} payment`;
	}

	async paymentValidator(imp_uid: string) {
		const importAccessTokenOptions: AxiosRequestConfig = {
			method: 'POST',
			url: 'https://api.iamport.kr/users/getToken',
			headers: { 'Content-Type': 'application/json' },
			data: {
				imp_key: process.env.IMPORT_RESTAPI_KEY,
				imp_secret: process.env.IMPORT_RESTAPI_SECRET,
			},
		};
		const response: AxiosResponse = await axios(importAccessTokenOptions).catch(
			(err) => null,
		);
		if (!response) {
			const HttpExcep = new HttpException(
				'something wrong with paymentData',
				HttpStatus.NON_AUTHORITATIVE_INFORMATION,
			);
			return HttpExcep;
		} else {
			const { access_token } = response.data.response;
			const importGetPaymentDataOptions: AxiosRequestConfig = {
				url: `https://api.iamport.kr/payments/${imp_uid}`,
				method: 'GET',
				headers: { Authorization: access_token },
			};
			const getPaymentData = await axios(importGetPaymentDataOptions);
			const paymentData = getPaymentData.data.response;
			// console.log(paymentData);
			return paymentData;
		}
	}
}
