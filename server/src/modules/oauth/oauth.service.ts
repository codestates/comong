import * as dotenv from 'dotenv';
dotenv.config();

import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { tokenMakerOutput } from './entities/tokenMakerOutput.entity';

import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { JwtService } from '@nestjs/jwt';
const models = require('../../models/index');

@Injectable()
export class OauthService {
	constructor(private readonly jwtService: JwtService) {}

	async googleOauthlogin(url: string, res: any): Promise<any> {
		console.log(url);

		const accessTokenOptions: AxiosRequestConfig = {
			method: 'POST',
			url: url,
		};
		const response: AxiosResponse = await axios(accessTokenOptions).catch(
			(err) => null,
		);

		if (!response) {
			const HttpExcep = new HttpException(
				'something wrong with authorizationCode',
				HttpStatus.NON_AUTHORITATIVE_INFORMATION,
			);
			res.send(HttpExcep);
		} else {
			const accessToken = response.data.access_token;
			const userInfoOptions: AxiosRequestConfig = {
				method: 'GET',
				url: `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`,
			};
			const googleDataResponse: AxiosResponse = await axios(userInfoOptions);
			let { email } = googleDataResponse.data;
			// console.log(email);
			const existingUser = await models.user.findOne({
				where: {
					email: email,
				},
			});

			if (!existingUser) {
				const newUser = await models.user.create({
					email: email,
				});
				await this.tokenMaker(newUser, res);
			} else {
				await this.tokenMaker(existingUser, res);
			}
		}
	}

	async kakaoOauthlogin(url: string, res: any): Promise<any> {
		// console.log(url);

		const accessTokenOptions: AxiosRequestConfig = {
			method: 'POST',
			url: url,
		};
		const response: AxiosResponse = await axios(accessTokenOptions).catch(
			(err) => null,
		);

		if (!response) {
			const HttpExcep = new HttpException(
				'something wrong with authorizationCode',
				HttpStatus.NON_AUTHORITATIVE_INFORMATION,
			);
			res.send(HttpExcep);
		} else {
			const accessToken = response.data.access_token;
			const userInfoOptions: AxiosRequestConfig = {
				method: 'GET',
				url: 'https://kapi.kakao.com/v2/user/me',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			};
			const kakaoDataResponse: AxiosResponse = await axios(userInfoOptions);
			let email = kakaoDataResponse.data.kakao_account.email;
			console.log(email);
			const existingUser = await models.user.findOne({
				where: {
					email: email,
				},
			});

			if (!existingUser) {
				const newUser = await models.user.create({
					email: email,
				});
				await this.tokenMaker(newUser, res);
			} else {
				await this.tokenMaker(existingUser, res);
			}
		}
	}

	async naverOauthlogin(url: string, res: any): Promise<any> {
		// console.log(url);

		const accessTokenOptions: AxiosRequestConfig = {
			method: 'POST',
			url: url,
		};
		const response: AxiosResponse = await axios(accessTokenOptions).catch(
			(err) => null,
		);
		if (response.data.error === 'invalid_request') {
			const HttpExcep = new HttpException(
				'something wrong with authorizationCode',
				HttpStatus.NON_AUTHORITATIVE_INFORMATION,
			);
			res.send(HttpExcep);
		} else {
			const accessToken = response.data.access_token;
			const userInfoOptions: AxiosRequestConfig = {
				method: 'GET',
				url: 'https://openapi.naver.com/v1/nid/me',
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			};
			const naverDataResponse: AxiosResponse = await axios(userInfoOptions);
			// console.log(naverDataResponse);
			let email = naverDataResponse.data.response.email;
			console.log(email);
			const existingUser = await models.user.findOne({
				where: {
					email: email,
				},
			});

			if (!existingUser) {
				const newUser = await models.user.create({
					email: email,
				});
				await this.tokenMaker(newUser, res);
			} else {
				await this.tokenMaker(existingUser, res);
			}
		}
	}

	async tokenMaker(user: any, res: any) {
		const payload = {
			id: user.dataValues.id,
			nickname: user.dataValues.nickname,
			email: user.dataValues.email,
		};
		const accessToken = this.jwtService.sign(payload);
		const refreshToken = this.jwtService.sign(payload, {
			secret: process.env.COMONG_REFRESH_SECRET,
			expiresIn: '15d',
		});
		const newResponse = {
			accessToken: accessToken,
			email: user.dataValues.email,
			nickname: user.dataValues.nickname,
		};

		const existingRefreshToken = await models.refreshtoken.findOne({
			where: {
				user_id: user.dataValues.id,
			},
		});

		if (!existingRefreshToken) {
			const newRefreshToken = await models.refreshtoken.create({
				refreshtoken: refreshToken,
				user_id: user.dataValues.id,
			});
			// console.log(newRefreshToken);
		} else {
			const updatedRefreshToken = await models.refreshtoken.update(
				{
					refreshtoken: refreshToken,
				},
				{
					where: {
						user_id: user.dataValues.id,
					},
				},
			);
		}

		const isSignedUp = await models.user.findOne({
			attributes: ['name'],
			where: {
				email: user.dataValues.email,
			},
		});

		let isNeedSignup: boolean;
		if(isSignedUp.dataValues.name) {
			isNeedSignup = false
		} else {
			isNeedSignup = true
		}

		const oauthResponese = { data: newResponse, needSignup: isNeedSignup, message: 'ok' };
		const output: tokenMakerOutput = {
			newResponse: oauthResponese,
			refreshToken: refreshToken,
		};

		res.cookie('refreshToken', output.refreshToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
		});
		res.send(output.newResponse);
	}
}
