import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { category } from './entities/category.entity';
const models = require('../../models/index');

@Injectable()
export class ItemsService {
  private categoryLists: category[] = [];

  create(createItemDto: CreateItemDto) {
    return 'This action adds a new item';
  }

  findAll() {
    return `This action returns all items`;
  }

  findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  remove(id: number) {
    return `This action removes a #${id} item`;
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
}
