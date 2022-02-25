import { Injectable, BadRequestException, Request, ForbiddenException, InternalServerErrorException, Response } from '@nestjs/common';
require('dotenv').config;
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { Logger } from '@nestjs/common';
const models = require('../../models/index');
const nodemailer = require('nodemailer');
import { MailerService } from '../mailer/mailer.service';
import { TokenService } from 'src/util/token';
import { v4 as uuid } from 'uuid'
import * as sequelize from 'sequelize'

export type User = any;

@Injectable()
export class UsersService {
	constructor(
		private readonly tokenService: TokenService
		) {}
	

	async create(user: CreateUserDto) {
		console.log(user)
		//console.log(user.likes.replace(/\[|\]/g, '').split(','))
		const [newUser, isCreated]: [{id: number}, boolean] = await models.user.findOrCreate({
			where: { email: user.email },
			defaults: {
				...user,
				birthday: user.dob,
				},
		});

		if (isCreated) {
			if(user.likes) {
				//console.log(user.likes, '라잌스')
				const likesArr = user.likes.replace(/\[|\]/g, '').split(',').map( async (elements: string): Promise<{user_id: number}> => {
					if(elements !== ''){
						return  await models.category_has_user.create({
							category_id: elements,
							user_id: newUser.id,
						})
					}
				})
	
				return Promise.all(likesArr).then(like => {
					like.forEach(elements => {
						if( elements && !(newUser.id === elements.user_id) ) {
							throw new BadRequestException('invalid value for property');
						} 
					})
				}).then( (): {} => {
					return { message: 'successful' }
				})
			} else {
				return { message: 'successful' }
			}
		} else {
			throw new BadRequestException('invalid value for property');
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
			throw new BadRequestException('invalid value for property');
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
			const accessToken = this.tokenService.generateAccessToken(user)
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

	async update(user: User, changes: UpdateUserDto) {
		const changed = await models.user.update({
			...changes,
			birthday: changes.dob,
		},
		{
			where: { id: user.id }
		})
		if (changed) {
			if(changes.likes ){
				const likesArr = changes.likes.replace(/\[|\]/g, '').split(',').map( async (elements: string): Promise<{user_id: number}> => {
					if(elements !== ''){
						console.log(elements)
						return  await models.category_has_user.create({
							category_id: elements,
							user_id: user.id,
						})
					}
				})
				console.log('likearr는', likesArr)
				likesArr.unshift(
					await models.category_has_user.destroy({
						where: {
							user_id: user.id
						}
					})
				)
				console.log('likearr는', likesArr)
	
				return Promise.all(likesArr).then(() => {
					return { message: 'successful' }
				})
			} else {
				return { message: 'successful' }
			}
		} else {
			throw new BadRequestException('invalid value for property');
		}
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
