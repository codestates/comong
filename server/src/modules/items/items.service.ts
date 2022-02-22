import * as dotenv from 'dotenv';
dotenv.config();

import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { category } from './entities/category.entity';
import { item } from './entities/item.entity'
import { Logger } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Op } from 'sequelize';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios'
import * as sequelize from 'sequelize'
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
const models = require('../../models/index');

@Injectable()
export class ItemsService {
  private categoryLists: category[] = [];
  private items: item[] =[];
  private readonly logger = new Logger(ItemsService.name);

  async create(newItem: CreateItemDto, user: User) {
    console.log(newItem, user)
    //newItem['user_id'] = user.id
    const item = await models.item.create({user_id: user.id, ...newItem})
    console.log(item)
    if(item) {
      const mappingCategory = await models.item_has_category.create({
        item_id: item.id,
        category_id: newItem.category,
      })

      const mappingStock = await models.item_inventory.create({
        item_id: item.id,
        stock: newItem.stock,
      })
        if(mappingCategory && mappingStock){
          return { message: 'successful' }
        } else {
          throw new BadRequestException('invalid value for property')
        }
      } else {
      throw new BadRequestException('invalid value for property')
      }
  }

  async getItems(category: number, number: number, keyword: string): Promise<item[]> {
    this.items = await models.item.findAll({
      include: [
        { model: models.item_has_category, as: 'item_has_categories', where: category ? { category_id: category } : '' },
        { model: models.user, as: 'user' , attributes: [ 'id', 'storename' ] },
    ],
      limit: number || 10,
      where: keyword && {
        [Op.or] : {
          title: { [Op.like]: '%' + keyword + '%' },
          contents: { [Op.like]: '%' + keyword + '%'  },
        },
      },
      order: [ [ 'createdAt', 'DESC' ]],
    })
    return this.items
  }
  
  async getimageuploadurl() {
    const options: AxiosRequestConfig = {
      method: "POST",
      url: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/images/v1/direct_upload`,
      headers: {
        'X-Auth-Email': 'onewithtruth@gmail.com',
        'X-Auth-Key': `${process.env.CLOUDFLARE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
    }
  
    const response: AxiosResponse = await axios(options)
    return response.data.result;
  
  }

  async getDetails(id: number): Promise<item[]> {
    this.items = await models.item.findOne({
      raw: true,
      where: { id: id },
      include: [
        { model: models.item_has_category, as: 'item_has_categories', attributes: [], include: [
          { model: models.category, as: 'category' , attributes: [] },
        ] },
        { model: models.user, as: 'user' , attributes: [] },
      ],
      attributes: [
        'id', 'title', 'contents', 'price', 'image_src', 'user_id', 'createdAt', 'updatedAt',
        [sequelize.col('user.storename'), 'user_storename'],
        [sequelize.col('item_has_categories.category.id'), 'category_id'],
        [sequelize.col('item_has_categories.category.category'), 'category'],
      ],
    })
    if(this.items){
      return this.items
    } else {
      throw new NotFoundException('this item does not exist')
    }
  }

  findOne(id: number) {
    this.logger.error('1234')
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
  }

  async getCategoryList():  Promise<category[]>{
    let categoryLists = await models.category.findAll({
      attributes: ['id', 'pid', 'depth', 'category'],
    });
    this.categoryLists = categoryLists.map((elem: { dataValues: object }) => {
      return elem.dataValues;
    });
    return this.categoryLists;
  }

  async createBookmark(data: CreateBookmarkDto) {
    const [bookmark, created] = await models.bookmark.findOrCreate({
      where: {
        item_id: data.item_id
      },
      defaults: data
    });
    if (created) {
      return { data: bookmark, message: `item_id: ${data.item_id} bookmark created`};
    } else {
      return { messgae: 'bookmark already exist'};
    }
  }
  
}
