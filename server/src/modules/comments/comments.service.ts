import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateItemReviewDto } from './dto/create-comment.dto';
import { UpdateItemReviewDto } from './dto/update-comment.dto';
import { DeleteItemReviewDto } from './dto/delete-commnet.dto';
import { Op } from 'sequelize';
const models = require('../../models/index');

@Injectable()
export class CommentsService {

  async createItemreview(data: CreateItemReviewDto) {
    const [itemreview, created] = await models.item_review.findOrCreate({
      where: {
        item_id: data.item_id,
        user_id: data.user_id
      },
      defaults: data
    });
    if (created) {
      return { data: itemreview, message: `item_id: ${data.item_id} review created`};
    } else {
      return { messgae: 'review already exist'};
    }
  }

  async patchItemreview(data: UpdateItemReviewDto) {
    const reviewUpdate = await models.item_review.update(
      {
        ...data
      },
      {
        where: {
          id: data.item_review_id,
        },
      },
    );
    if(reviewUpdate[0] === 1) {
      return {
				message: `item_review_id:${data.item_review_id} updated`,
			};
		} else {
			throw new BadRequestException(
				`item_review_id: ${data.item_review_id} has no Data or Data Disaccord`,
			);
		}
  }

  async getItemreview(user_id: number) {
    if (!user_id) {
			throw new BadRequestException('user_id must be included');
    } else {
      const itemreviewList = await models.item_review.findAll({
        where: {
          user_id: user_id
        }
      })
      const itemIdArr = itemreviewList.map((elem) => {
        return elem.dataValues.item_id
      })
      const itemList = await models.item.findAll({
        where: {
					id: {
						[Op.or]: [itemIdArr],
					},
				},
      })
      let output = {};
      for (let i = 0; i < itemreviewList.length; i++) {
        output[`item_review_id_${itemreviewList[i].id}`] = {
          item_reviewInfo: itemreviewList[i],
          itemInfo: {}
        };
        for (let j = 0; j < itemList.length; j++) {
          if (itemreviewList[i].item_id === itemList[j].id) {
            output[`item_review_id_${itemreviewList[i].id}`]["itemInfo"] = itemList[j]
            
          }
        };
      };
      return {data: output , message:'successful'}
    }
  }

  async removeItemreview(item_review_id: DeleteItemReviewDto) {
		const isDestroyed = await models.item_review.destroy({
			where: {
				id: item_review_id.item_review_id,
			},
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
	}
}
