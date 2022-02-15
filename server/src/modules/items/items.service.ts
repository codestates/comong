import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { category } from './entities/category.entity';
import { item } from './entities/item.entity'
import { Logger } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Op } from 'sequelize';
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
    if(item) {
      return { message: 'successful' }
      } else {
      throw new BadRequestException('invalid value for property')
      }
  }

  async getItems(category: number, number: number, keyword: string): Promise<item[]> {
    this.items = await models.item.findAll({
      include: [
        { model: models.item_has_category, as: 'item_has_categories', where: category ? { category_id: category } : '' },
        { model: models.user, as: 'user' , attributes: [ 'id', 'nickname' ] },
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
}
