import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
const bcrypt = require('bcrypt')

@Injectable()
export class BcryptPasswordHashPipe implements PipeTransform {
    async transform(user: any, metadata: ArgumentMetadata) {
        if(user.hasOwnProperty('password')){
            //round 뜻: 16^2 만큼 해싱을 반복한다(공식문서에서는 10~12 이상 설정 권고)
            const saltRound = 16
            const salt = bcrypt.genSaltSync(saltRound)
        
            const hash = bcrypt.hashSync(user.password, salt)
    
            delete user.password
            
            return { ...user, password: hash }
        } else {
            return user
        }
    }
}
