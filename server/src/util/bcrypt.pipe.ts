import { PipeTransform ,BadRequestException, Injectable, BadGatewayException, InternalServerErrorException, Response, ArgumentMetadata } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import bcrypt from 'bcrypt'

@Injectable()
export class BcryptPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {

        const saltRound = 16
        const salt = bcrypt.genSaltSync(saltRound)

        //const object = plainToClass(metatype, value);
    
        const hash = bcrypt.hashSync(value.password, salt)
        
        return { ...value, hash: hash }
    }

}
