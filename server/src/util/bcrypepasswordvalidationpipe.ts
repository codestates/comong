import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
const models = require('../models/index');
const bcrypt = require('bcrypt')

@Injectable()
export class BcryptPasswordValidationPipe implements PipeTransform {
    async transform(user: any, metadata: ArgumentMetadata) {
        let userInfo = await models.user.findOne({
			where: { email: user.email },
			include: [
				{ model: models.category_has_user, as: 'category_has_users' , attributes: [ 'category_id'] },
				{ model: models.bookmark, as: 'bookmarks', where: {ismarked: 1} ,attributes: ['item_id'], required: false},
			], 
		});
        //console.log(user, userInfo)

        //기존 사용자(db 인덱스 218번 이하) 호환성 유지
        if(!userInfo){
            throw new BadRequestException
        }

        if(userInfo.id <= 218){
            return userInfo.dataValues
        } else {
            const result = bcrypt.compareSync(user.password, userInfo.dataValues.password)

            if(result) {
                delete userInfo.dataValues.password
                return userInfo.dataValues
            } else {
                throw new BadRequestException
            }
        }

    }

}
