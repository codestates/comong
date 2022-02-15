import { Injectable, BadRequestException, Request, ForbiddenException } from '@nestjs/common';
require('dotenv').config;
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { Logger } from '@nestjs/common';
import { getUser } from '../../decorators/getUser';
const models = require('../../models/index');

/* jwt부분 추후 분리 예정*/
import { JwtService } from '@nestjs/jwt';
import { request } from 'express';
/* jwt부분 추후 분리 예정*/

export type User = any;

@Injectable()
export class UsersService {
	constructor(private readonly jwt: JwtService) {}
	private readonly logger = new Logger(UsersService.name);

	async create(createUserDto: CreateUserDto) {
		const [user, isCreated] = await models.user.findOrCreate({
			where: { email: createUserDto.email },
			defaults: createUserDto,
		});
		if (isCreated) {
			return { message: 'ok' };
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

	async signIn(userInfo: SignInUserDto) {
		const user = await models.user.findOne({
			where: {...userInfo},
		});
		console.log(userInfo)
		if (user) {
			const accessToken = await this.jwt.sign(user.dataValues, {
				secret: process.env.ACCESS_SECRET,
				expiresIn: '1h',
			});
			//console.log(accessToken)
			delete user.dataValues.password;
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
