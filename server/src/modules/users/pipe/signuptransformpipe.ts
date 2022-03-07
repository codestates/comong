import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class signUpTransformPipe implements PipeTransform {
    async transform(user: CreateUserDto, metadata: ArgumentMetadata) {
        const userProps = [
            'name',
            'email',
            'password',
            'mobile',
            'phone',
            'gender',
            //'dob', 뒤에서 검사
            'role',
        ]

        const addressProps = [
            //'address_line1',
            //'address_line2',
            'postal_code',
            'city',
            'country',
            'telephone',
            'mobile'
        ]

        const likesProps = [
            'likes'
        ]

        const userArr = []
        const addressArr = []
        const likesArr = []

        Object.entries(user).forEach(elements => {
            if(elements[0] === 'dob'){
                userArr.push(['birthday', elements[1]])
            }

            if(elements[0] === 'phone'){
                userArr.push(['mobile', elements[1]])
            }

            if(userProps.includes(elements[0])){
                userArr.push(elements)
            }
        })

        Object.entries(user).forEach(elements => {

            if(elements[0] === 'address1'){
                addressArr.push(['address_line1', elements[1]])
            }

            if(elements[0] === 'address2'){
                addressArr.push(['address_line2', elements[1]])
            }

            if(addressProps.includes(elements[0])){
                addressArr.push(elements)
            }
        })

        Object.entries(user).forEach(elements => {
            if(likesProps.includes(elements[0])){
                likesArr.push(elements)
            }
        })

        const userObject = Object.fromEntries(userArr)
        const addressObject = Object.fromEntries(addressArr)
        const likesObject = Object.fromEntries(likesArr)

        //delete userObject.dob

        //console.log(userArr)
        //console.log(addressArr)

        return { user: userObject, address: addressObject, likes: user.likes }

    }
}
