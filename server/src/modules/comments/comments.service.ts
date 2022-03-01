import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateItemReviewDto } from './dto/create-comment.dto';
import { UpdateItemReviewDto } from './dto/update-comment.dto';
import { DeleteItemReviewDto } from './dto/delete-commnet.dto';
import { Op } from 'sequelize';
const models = require('../../models/index');
const Sequelize = models.sequelize;

@Injectable()
export class CommentsService {
	async createItemreview(data: CreateItemReviewDto) {
		const result = await Sequelize.transaction(async (t) => {
			const [itemreview, created] = await models.item_review.findOrCreate({
				where: {
					order_detail_id: data.order_detail_id,
					user_id: data.user_id,
				},
				defaults: data,
				transaction: t,
			});
			if (created) {
				return {
					data: itemreview,
					message: `order_detail_id: ${data.order_detail_id} review created`,
				};
			} else {
				return { messgae: 'review already exist' };
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

	async patchItemreview(data: UpdateItemReviewDto) {
		const result = await Sequelize.transaction(async (t) => {
			const reviewUpdate = await models.item_review.update(
				{
					...data,
				},
				{
					where: {
						id: data.item_review_id,
					},
					transaction: t,
				},
			);
			if (reviewUpdate[0] === 1) {
				return {
					message: `item_review_id:${data.item_review_id} updated`,
				};
			} else {
				throw new BadRequestException(
					`item_review_id: ${data.item_review_id} has no Data or Data Disaccord`,
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

	async getUserItemReview(user_id: number) {
		const result = await Sequelize.transaction(async (t) => {
			if (!user_id) {
				throw new BadRequestException('user_id must be included');
			} else {
				const itemreviewList = await models.item_review.findAll({
					where: {
						user_id: user_id,
					},
					transaction: t,
				});
				const orderDeatilIdArr = itemreviewList.map((elem) => {
					return elem.dataValues.order_detail_id;
				});
				const orderDetailList = await models.order_detail.findAll({
					where: {
						id: {
							[Op.or]: [orderDeatilIdArr],
						},
					},
					transaction: t,
				});
				const itemIdArr = orderDetailList.map((elem) => {
					return elem.item_id;
				});
				// console.log(itemIdArr);
				let setItemIdArr = new Set(itemIdArr);
				let uniqueItemIdArr = [...setItemIdArr];
				const itemList = await models.item.findAll({
					where: {
						id: {
							[Op.or]: uniqueItemIdArr,
						},
					},
					transaction: t,
				});
				let output = {};
				for (let i = 0; i < itemreviewList.length; i++) {
					output[`item_review_id_${itemreviewList[i].id}`] = {
						item_reviewInfo: itemreviewList[i],
						orderDeailInfo: {},
						itemInfo: {},
					};
					for (let j = 0; j < orderDetailList.length; j++) {
						if (itemreviewList[i].order_detail_id === orderDetailList[j].id) {
							output[`item_review_id_${itemreviewList[i].id}`][
								'orderDeailInfo'
							] = orderDetailList[j];
						}
						for (let k = 0; k < itemList.length; k++) {
							if (orderDetailList[j].item_id === itemList[k].id) {
								output[`item_review_id_${itemreviewList[i].id}`]['itemInfo'] =
									itemList[k];
							}
						}
					}
				}
				return { data: output, message: 'successful' };
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

	async getListItemreview(item_id: number) {
		const result = await Sequelize.transaction(async (t) => {
			if (!item_id) {
				throw new BadRequestException(
					'item_id must be needed for query parameter',
				);
			} else {
				const orderDetailList = await models.order_detail.findAll({
					where: {
						item_id: item_id,
					},
				});
				const orderDetailIdArr = orderDetailList.map((elem) => {
					return elem.id;
				});
				const itemreviewList = await models.item_review.findAll({
					where: {
						order_detail_id: {
							[Op.or]: orderDetailIdArr,
						},
					},
				});
				return { data: itemreviewList, message: 'successful' };
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

	async removeItemreview(item_review_id: DeleteItemReviewDto) {
		const result = await Sequelize.transaction(async (t) => {
			const isDestroyed = await models.item_review.destroy({
				where: {
					id: item_review_id.item_review_id,
				},
				transaction: t,
			});
			if (isDestroyed === 1) {
				return {
					message: `item_review_id:${item_review_id.item_review_id} destroyed`,
				};
			} else {
				throw new BadRequestException(
					`item_review_id: ${item_review_id.item_review_id} has no Data or Data Disaccord`,
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
