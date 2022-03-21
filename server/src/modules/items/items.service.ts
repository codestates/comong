import * as dotenv from 'dotenv';
dotenv.config();

import {
	Injectable,
	BadRequestException,
	NotFoundException,
	CACHE_MANAGER,
	Inject,
} from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { category } from './entities/category.entity';
import { item } from './entities/item.entity';
import { Logger } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Op } from 'sequelize';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as sequelize from 'sequelize';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { StockManagement } from './dto/stockmanagement.dto';
import { Cache } from 'cache-manager'

const models = require('../../models/index');
const Sequelize = models.sequelize;

@Injectable()
export class ItemsService {
	constructor(
		@Inject(CACHE_MANAGER) private cacheManager: Cache
	) {}
	
	private categoryLists: category[] = [];
	private items: item
	private readonly logger = new Logger(ItemsService.name);

	async create(newItem: CreateItemDto, user: User) {
		let transaction;

		try {
			transaction = await models.sequelize.transaction();

			const item = await models.item.create({ user_id: user.id, ...newItem });

			await models.item_has_category.create({
				item_id: item.id,
				category_id: newItem.category,
			});

			await models.item_inventory.create({
				item_id: item.id,
				stock: newItem.stock,
			});

			await transaction.commit();

			return { message: 'successful' };

		} catch (err) {
			if(transaction) await transaction.rollback();
		}

		/*
		const item = await models.item.create({ user_id: user.id, ...newItem });
		//console.log(item);
		if (item) {
			const insertCategory = await models.item_has_category.create({
				item_id: item.id,
				category_id: newItem.category,
			});

			const insertStock = await models.item_inventory.create({
				item_id: item.id,
				stock: newItem.stock,
			});
			if (mappingCategory && mappingStock) {
				return { message: 'successful' };
			} else {
				throw new BadRequestException('invalid value for property');
			}
		} else {
			throw new BadRequestException('invalid value for property');
		}
		*/
	}

	async getItems(
		category?: number,
		number?: number,
		keyword?: string,
		startindex?: number,
	): Promise<item[]> {

		const condition = (): any => {
			let result = {}
			if (keyword) {
				result = Object.assign(result, {
					[Op.or]: {
						title: { [Op.like]: '%' + keyword + '%' },
						contents: { [Op.like]: '%' + keyword + '%' },
					},
				},)
			}

			if(startindex) {
				result = Object.assign(result, {
					id: {
						[Op.lt]: startindex
					}
				})
			}
			return result
		}

		const items = await models.item.findAll({
			//raw: true,
			//group: ['item.contents'],
			include: [
				{
					model: models.item_has_category,
					as: 'item_has_categories',
					where: category ? { category_id: category } : '',
				},
				{ model: models.user, as: 'user', attributes: ['id', 'storename'] },
				{model: models.order_detail, as: 'order_details', attributes: ['id'], duplicating: true, raw: true, include: [
					{model: models.item_review, as: 'item_reviews', require: false, attributes: {
						include: [
							//[sequelize.fn('COUNT', sequelize.col('order_details.item_reviews.score')), 'number_of_reviewer'],
							//[sequelize.literal(`(SELECT COUNT(score) AS nor FROM item_review)`), 'nor']
						]
					}
					}
				]},
				{model: models.bookmark, as: 'bookmarks', require: false,},
			],
			limit: number || 10,
			where: condition(),
			order: [['createdAt', 'DESC']],
	
			//offset: offset(),
		});
		//console.log(this.items.length)
		items.forEach(elements => {
			if(elements.order_details){
				const number_of_reviewers = elements.order_details.length
				const sum_of_scores = elements.order_details.map(elements => {
					if(elements.length > 0){
						return elements.score
					} else {
						return 2.5
					}
				})
				.reduce((prevVal, currentVal) => {
					return prevVal + currentVal
				}, 0)
				//console.log('평균은', sum_of_score/number_of_reviewer)
				//console.log('개수는', number_of_reviewer)
				Object.assign(elements.dataValues, {number_of_reviewers: number_of_reviewers})
				Object.assign(elements.dataValues, {average_of_scores: sum_of_scores/number_of_reviewers})
				
				delete elements.dataValues.order_details
			}

			if(elements.bookmarks){
				let number_of_bookmarks = 0
				elements.bookmarks.forEach(elements => {
					if(elements.ismarked === 1){
						number_of_bookmarks++
					}
				})
				Object.assign(elements.dataValues, {number_of_bookmarks: number_of_bookmarks})

				delete elements.dataValues.bookmarks
			}
		})

		return items;
	}

	async getimageuploadurl() {
		const options: AxiosRequestConfig = {
			method: 'POST',
			url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/direct_upload`,
			headers: {
				'X-Auth-Email': 'onewithtruth@gmail.com',
				'X-Auth-Key': `${process.env.CLOUDFLARE_API_TOKEN}`,
				'Content-Type': 'application/json',
			},
		};

		const response: AxiosResponse = await axios(options);
		return response.data.result;
	}

	async getDetails(id: number): Promise<item> {
		this.items = await models.item.findOne({
			//raw: true,
			where: { id: id },
			include: [
				{
					model: models.item_has_category,
					as: 'item_has_categories',
					attributes: [],
					include: [{ model: models.category, as: 'category', attributes: ['id', 'category'] }],
					raw: true,
				},
				{ model: models.user, as: 'user', attributes: [],},
				{ model: models.item_inventory, as: 'item_inventories', attributes: [] },
				{model: models.order_detail, as: 'order_details', attributes: {include: ['id']}, raw: true, nest: true, include: [
					{model: models.item_review, as: 'item_reviews', require: true, attributes: [
						//'contents',
						//'image_src',
						//'score',
						//kk'user_id',
						[sequelize.fn('COUNT', sequelize.col('score')), 'number_of_reviewer'],
						[sequelize.fn('AVG', sequelize.col('score')), 'avg_score']
					], include: [
						//{model: models.user, as: 'user', attributes: ['email'],}
					]},
				]},
				{model: models.bookmark, as: 'bookmarks', require: false, attributes: [[sequelize.fn('count', sequelize.col('ismarked')), 'numbertfsf']]},

			],
			attributes: [
				'id',
				'title',
				'contents',
				'price',
				'image_src',
				'user_id',
				'createdAt',
				'updatedAt',
				[sequelize.col('item_inventories.stock'), 'stock'],
				[sequelize.col('user.storename'), 'user_storename'],
				[sequelize.col('item_has_categories.category.id'), 'category_id'],
				[sequelize.col('item_has_categories.category.category'), 'category'],
				
			],
		});
		if (this.items) {
			//const number: number = await this.cacheManager.get(this.items.id.toString())
			//console.log(number)
			//await this.cacheManager
			//await this.cacheManager.set(this.items.id.toString(), (number === undefined) ? 1 : (number + 1), { ttl: 600 })
			//await this.cacheManager.set(this.items.id.toString(), 'test', { ttl: 600 })
			return this.items;
		} else {
			throw new NotFoundException('this item does not exist');
		}
	}

	async getComments(id: number): Promise<any>{
		const comments = await models.item_review.findAll({
			include: [
				{model: models.order_detail, as: 'order_detail', include: [
					{model: models.item, as: 'item', where: {id: id}, require: true}
				]}
			]
		})
		return comments
	}

	async getCategoryList(): Promise<category[]> {
		let categoryLists = await models.category.findAll({
			attributes: ['id', 'pid', 'depth', 'category'],
		});
		this.categoryLists = categoryLists.map((elem: { dataValues: object }) => {
			return elem.dataValues;
		});
		return this.categoryLists;
	}

	async createBookmark(data: CreateBookmarkDto) {
		const result = await Sequelize.transaction(async (t) => {
			const [bookmark, created] = await models.bookmark.findOrCreate({
				where: {
					item_id: data.item_id,
					user_id: data.user_id,
				},
				defaults: data,
				transaction: t,
			});
			if (created) {
				return {
					data: bookmark,
					message: `item_id: ${data.item_id} bookmark created`,
				};
			} else {
				const bookmark = await models.bookmark.findOne({
					where: {
						item_id: data.item_id,
						user_id: data.user_id,
					},
					transaction: t,
				});
				await models.bookmark.update(
					{
						ismarked: data.ismarked ? 1 : 0,
					},
					{
						where: {
							id: bookmark.id,
						},
						transaction: t,
					},
				);
				return { messgae: 'bookmark updated successfully' };
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

	async getbookmarks(user_id: number) {
		const result = await Sequelize.transaction(async (t) => {
			const bookmarkList = await models.bookmark.findAll({
				include: [
					{
						model: models.item,
						as: 'item',
						include: [
							{ model: models.user, as: 'user', attributes: ['storename'] },
						],
					},
				],
				where: {
					user_id: user_id,
				},
				transaction: t,
			});
			let output = bookmarkList.filter((elem) => {
				return elem.ismarked === 1;
			});
			return output;
		})
			.then((result: any) => {
				return result;
			})
			.catch((err: any) => {
				return err;
			});
		return result;
	}

	async stockmanagement(data: StockManagement) {
		console.log(data.insert_item_stock);
		for (let i = 1; i < 5000; i++) {
			const isExistItem = await models.item.findOne({
				where: {
					id: i,
				},
			});
			console.log(isExistItem);
			if (isExistItem) {
				const [item_inventory, isCreate] =
					await models.item_inventory.findOrCreate({
						where: {
							item_id: i,
						},
						defaults: {
							stock: data.insert_item_stock,
						},
					});
				if (isCreate) {
					continue;
				} else {
					await models.item_inventory.update(
						{
							stock: data.insert_item_stock,
						},
						{
							where: {
								item_id: i,
							},
						},
					);
				}
			} else {
				continue;
			}
		}
		return { message: 'stocks updated successfully' };
	}

	async getkeywords() {
		const keyword = await models.keyword.findAll({
			limit: 10,
			order: [['score', 'DESC']],
		});
		return { data: keyword, message: 'successful' };
	}

	async keywordProcessor(keyword: string) {
		const result = await Sequelize.transaction(async (t) => {
			const keywordArr = keyword.split(' ');
			for (let i = 0; i < keywordArr.length; i++) {
				const existingKeyword = await models.keyword.findOne({
					where: {
						keyword: keywordArr[i],
					},
					transaction: t,
				});
				if (existingKeyword) {
					await models.keyword.increment(
						{
							score: 1,
						},
						{
							where: {
								keyword: keywordArr[i],
							},
							transaction: t,
						},
					);
				} else {
					await models.keyword.create(
						{
							keyword: keywordArr[i],
							score: 1,
						},
						{ transaction: t },
					);
				}
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

	getSellingItems() {
		return models.keyword.findOne({})
	}

	update(id: number, updateItemDto: UpdateItemDto) {
		return `This action updates a #${id} item`;
	}

	remove(id: number) {
		return `This action removes a #${id} item`;
	}

	async inferCategory(title) {
		const data = await this.cacheManager.get('title')
		console.log(data, title)
		await this.cacheManager.set('title', title)
		return data
	}

	async getPeakStuff() {

	}
}
