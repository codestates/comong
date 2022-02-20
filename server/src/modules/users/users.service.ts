import { Injectable, BadRequestException, Request, ForbiddenException, InternalServerErrorException, Response } from '@nestjs/common';
require('dotenv').config;
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { Logger } from '@nestjs/common';
const models = require('../../models/index');
const nodemailer = require('nodemailer');
import { MailerService } from '../mailer/mailer.service';
import { v4 as uuid } from 'uuid'

/* jwt부분 추후 분리 예정*/
import * as jwt from 'jsonwebtoken'
/* jwt부분 추후 분리 예정*/

export type User = any;

@Injectable()
export class UsersService {
	constructor(private readonly mailerService: MailerService) {}
	private readonly logger = new Logger(UsersService.name);

	async create(user: CreateUserDto) {
		console.log(user.likes.replace(/\[|\]/g, '').split(','))
		const [newUser, isCreated] = await models.user.findOrCreate({
			where: { email: user.email },
			defaults: { ...user },
		});

		if (isCreated) {
			const likesArr = user.likes.replace(/\[|\]/g, '').split(',').map( async (elements) => {
				return  await models.category_has_user.create({
					category_id: elements,
					user_id: newUser.id,
				})
			})

			return Promise.all(likesArr).then(like => {
				like.forEach(elements => {
					if(!newUser.id === elements.user_id){
						throw new BadRequestException('invalid value for property');
					} 
				})
			}).then( (): {} => {
				return { message: 'successful' }
			})
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
		let user = await models.user.findOne({
			where: { ...userInfo },
		});
		try {
			user['gender'] = parseInt(user['gender']);
			user['role'] = parseInt(user['role'])
		} catch(err) {
			throw new InternalServerErrorException({ message: 'Internal Server Error' })
		}
		console.log(userInfo)
		if (user) {
			delete user.dataValues.password;
			console.log('엑세스 시크릿', process.env.ACCESS_SECRET)
			const accessToken = await jwt.sign(user.dataValues, process.env.ACCESS_SECRET, {
				expiresIn: '1h',
			});
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
		const changed = await models.user.update( changes, {
			where: { id: user.id }
		})
		if (changed) {
			return { message: 'successful' };
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
