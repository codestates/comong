import { Injectable, BadRequestException, ForbiddenException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
require('dotenv').config;
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
const models = require('../../models/index');
import { TokenService } from 'src/util/token';
import { v4 as uuid } from 'uuid'
import * as sequelize from 'sequelize'
import * as dotenv from 'dotenv';
dotenv.config();

export type User = any;

@Injectable()
export class UsersService {
	constructor(
		private readonly tokenService: TokenService
		) {}
	

	async create(info: any) {
		//console.log(info)
		const { user, address, likes } = info
		//console.log(user.likes.replace(/\[|\]/g, '').split(','))
		const [newUser, isCreated]: [{id: number}, boolean] = await models.user.findOrCreate({
			where: { email: user.email },
			defaults: {
				...user,
				},
		});

		if (isCreated) {
			//관심 카테고리 등록
			const infoArr = []
			if(Object.keys(likes).length>0) {
				//console.log(user.likes, '라잌스')
				const likesArr = likes.replace(/\[|\]/g, '').split(',')
				likesArr.forEach( async (elements: string): Promise<void> => {
					if(elements !== ''){
						infoArr.push(models.category_has_user.create({
							category_id: elements,
							user_id: newUser.id,
						}))
					}
				})
			}

			if(Object.keys(address).length>0) {
				infoArr.push(models.user_address.create({
					user_id: newUser.id,
					...address,
				}))
			}

			//console.log(infoArr)

			return Promise.all(infoArr).then(result => {
				result.forEach((elements, index) => {
					console.log(elements, `${index} 번째 앨리먼트는`)
					if(elements[0] === 0 || elements[0] === 1){
						return { message: 'successful' }
					} else {
						throw new BadRequestException('invalid value for property');
					}
				})
			}).then( (): {} => {
				return { message: 'successful' }
			})

		} else {
			throw new BadRequestException('invalid value for property123');
		}
	}

	async getAddress(user: User): Promise<{}> {
		const address = await models.user_address.findOne({
			//raw: true,
			include: [
				{ model: models.user, as: 'user', where: { email: user.email }, attributes: []}
			],
			attributes: [
				'user_id',
				[sequelize.col('user.email'), 'email'],
				'address_line1',
				'address_line2',
				'postal_code',
				'city',
				'country',
				'telephone',
				'mobile',
			]
		})
		if(address){
			return { message: 'successful', address}
		} else {
			throw new NotFoundException('address does not exist')
		}
	}

	async isDuplicate(email: string) {
		const user = await models.user.findOne({where: { email: email }})
		if(!user){
			return { message: 'available' };
		} else {
			throw new ForbiddenException('This email address is already being used')
		}
	}
	
	async verification(code: string) {
		return { message: 'successful', code: uuid() }
	}

	async signIn(userInfo: SignInUserDto): Promise<{}>{
		/*
		let user = await models.user.findOne({
			where: { ...userInfo },
			include: [
				{ model: models.category_has_user, as: 'category_has_users' , attributes: [ 'category_id'] },
				{ model: models.bookmark, as: 'bookmarks', where: {ismarked: 1} ,attributes: ['item_id'], required: false},
			], 
		});
		*/
		const user = userInfo
		//console.log(user)
		if (user) {
			try {
				user['gender'] = parseInt(user['gender']);
				user['role'] = parseInt(user['role'])
			} catch(err) {
				throw new InternalServerErrorException({ message: 'Internal Server Error' })
			}
			const accessToken = await this.tokenService.generateAccessToken(user)
			return { message: 'successful', user, accessToken };
		} else {
			return { message: 'err', user };
		}
	}

	findAll(signInUserDto: SignInUserDto) {
		return `This action returns all users`;
	}

	signOut(user: User) {
		return user;
	}

	async update(userInfoFromToken: User, info: any) {
		const {user, likes, address} = info
		console.log(info)

		const infoArr = []
		if(Object.keys(user).length>0) {
			infoArr.push(models.user.update({
				...user,
			},
			{
				where: { id: userInfoFromToken.id }
			}))			
		}

		if(Object.keys(likes).length>0) {
			//console.log(user.likes, '라잌스')
			const likesArr = likes.replace(/\[|\]/g, '').split(',')
			likesArr.forEach( async (elements: string): Promise<void> => {
				if(elements !== ''){
					infoArr.push(models.category_has_user.create({
						category_id: elements,
						user_id: userInfoFromToken.id,
					}))
				}
			})
		}

		if(Object.keys(address).length>0) {
			infoArr.push(models.user_address.update({
				...address,
			},{
			where: {
				user_id: userInfoFromToken.id,
			}}))
		}
		//console.log(infoArr)
		return Promise.all(infoArr).then(result => {
			result.forEach(elements => {
				console.log(elements[0])
				if(elements[0] === 0 || elements[0] === 1){
					return { message: 'successful' }
				} else {
					throw new BadRequestException('invalid value for property');
				}
			})
		}).then( (): {} => {
			return { message: 'successful' }
		})
	}

	async remove(user) {
		const deletedUser = await models.user.destroy({
			where: { email: user.email },
		});
		if (deletedUser) {
			return { message: 'successful' };
		} else {
			throw new BadRequestException('invalid value for property');
		}
	}
}
