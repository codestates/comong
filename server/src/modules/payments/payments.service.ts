import * as dotenv from 'dotenv';
dotenv.config();

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const { Op } = require('sequelize');
const models = require('../../models/index');

@Injectable()
export class PaymentsService {
	async create(createPaymentDto: CreatePaymentDto) {
		if (createPaymentDto.status === 'paid') {
			const validationData = await this.paymentValidator(
				createPaymentDto.imp_uid,
			);
			const { amount, status } = validationData;
			if (
				amount === createPaymentDto.total_amount &&
				status === createPaymentDto.status
			) {
				const [user_payment, isCreated] =
					await models.user_payment.findOrCreate({
						where: { order_id: createPaymentDto.order_id },
						defaults: createPaymentDto,
					});
				if (isCreated) {
					const orderUpdate = await models.order.update(
						{
							status: 'paid',
						},
						{
							where: {
								id: createPaymentDto.order_id,
							},
						},
					);
					const listforUpdate = await models.order_detail_has_order.findAll({
						where: { order_id: createPaymentDto.order_id },
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
						},
					);
					return { data: user_payment, message: 'payment successful' };
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
