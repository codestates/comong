import {
	Injectable,
	BadRequestException,
	ForbiddenException,
	InternalServerErrorException,
	NotFoundException,
	ServiceUnavailableException,
} from '@nestjs/common';
require('dotenv').config;
import { SignInUserDto } from './dto/signin-user.dto';
const models = require('../../models/index');
import { TokenService } from 'src/util/token';
import { v4 as uuid } from 'uuid';
import { UpdateNotificationDto } from './dto/update.notification.dto';
const sequelize = models.sequelize;

export type User = any;

@Injectable()
export class UsersService {
	constructor(private readonly tokenService: TokenService) {}

	async create(info: any) {
		//console.log(info)
		const { user, address, likes } = info; //파이프라인을 통해 입력값을 { user: ~~, address: ~~, likes: ~~ } 형태로 변형
		//console.log(user.likes.replace(/\[|\]/g, '').split(','))
		const [newUser, isCreated]: [{ id: number }, boolean] =
			await models.user.findOrCreate({
				where: { email: user.email },
				defaults: {
					...user,
				},
			});

		//계정이 생성되었을 경우에만 관심 카테고리, 주소 테이블에 데이터 등록 진행
		if (isCreated) {
			//관심 카테고리 등록
			const workArr = [];
			if (likes && Object.keys(likes).length > 0) {
				//console.log(user.likes, '라잌스')
				const likesArr = likes.replace(/\[|\]/g, '').split(','); // like의 형태는 ['1', '2']와 같은 배열 형태의 문자열임
				likesArr.forEach((elements) => {
					if (elements !== '') {
						//빈 문자열 제외(빈 배열일경우 빈문자열로 받아지는 경우라 제외)
						const insertLikes = (transaction) => {
							// 프로미스의 형태로 새 transaction을 생성할 것이므로 transaction을 매개변수로 받는 함수 형태로 만듦
							return new Promise((resolve, reject) => {
								//일반적인 프로미스 생성 형태
								return models.category_has_user
									.create(
										{
											// 중간중간 정확하게 리턴해주는것이 중요
											category_id: elements,
											user_id: newUser.id,
										},
										{ transaction: transaction },
									)
									.then((insertedLikes) => {
										//sequelize 모델의 함수 사용시 transaction 설정해야함, 여기서는 매개변수로 받는 transaction임
										resolve(insertedLikes); //성공했을때 넘어가는 값은 방금 호출로 생성된 관심카테고리
									})
									.catch((error) => {
										reject(error); //밑에서 다시 serviceunavilable exception 생성할 것이므로 그냥 error 만 넘겨줌
									});
							});
						};
						workArr.push(insertLikes); //promise.all이 iterable 요소를 받으므로 배열안에 차곡차곡 함수를 쌓아줌
					}
				});
			}

			if (address && Object.keys(address).length > 0) {
				const insertAddress = (transaction) => {
					return new Promise((resolve, reject) => {
						return models.user_address
							.create(
								{
									user_id: newUser.id,
									...address,
								},
								{ transaction: transaction },
							)
							.then((insertedAddress) => {
								resolve(insertedAddress);
							})
							.catch((error) => {
								reject(error);
							});
					});
				};
				workArr.push(insertAddress);
			}

			return new Promise((resolve, reject) => {
				//실실적인 create 메서드의 리턴문
				//console.log(workArr[0])
				return models.sequelize.transaction().then((transaction) => {
					//트랜잭션 생성 후 넘겨줌

					return Promise.all(
						workArr.map((insertFunc) => {
							return insertFunc(transaction); // 이 시점에서 프로미스가 pending이 되나요?? 저도잘모르겠습니다
						}),
					)
						.then((values) => {
							//console.log(values, 'resolve')
							transaction.commit(); // 성공했을 경우 지금 transaction은 unmanaged transaction 이라 수동으로 commit을 해주어야 함
							resolve({ message: 'successful' });
						})
						.catch((error) => {
							//console.log(error, '에러')
							transaction.rollback(); // 에러 발생 시에도 똑같이 수동으로 rollback 해주어야 함
							reject(
								new ServiceUnavailableException(
									'a network-related or database instance-specific error occurred while inserting new data',
								),
							); //에러 발생시 응답
						});
				});
			});
		} else {
			throw new BadRequestException('invalid value for property');
		}
	}

	async getAddress(user: User): Promise<{}> {
		const address = await models.user_address.findOne({
			//raw: true,
			include: [
				{
					model: models.user,
					as: 'user',
					where: { email: user.email },
					attributes: [],
				},
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
			],
		});
		if (address) {
			return { message: 'successful', address };
		} else {
			throw new NotFoundException('address does not exist');
		}
	}

	async isDuplicate(email: string) {
		const user = await models.user.findOne({ where: { email: email } });
		if (!user) {
			return { message: 'available' };
		} else {
			throw new ForbiddenException('This email address is already being used');
		}
	}

	async verification(code: string) {
		return { message: 'successful', code: uuid() };
	}

	async signIn(userInfo: SignInUserDto): Promise<{}> {
		/*
		let user = await models.user.findOne({
			where: { ...userInfo },
			include: [
				{ model: models.category_has_user, as: 'category_has_users' , attributes: [ 'category_id'] },
				{ model: models.bookmark, as: 'bookmarks', where: {ismarked: 1} ,attributes: ['item_id'], required: false},
			], 
		});
		*/
		const user = userInfo;
		//console.log(user)
		if (user) {
			try {
				user['gender'] = parseInt(user['gender']);
				user['role'] = parseInt(user['role']);
			} catch (err) {
				throw new InternalServerErrorException({
					message: 'Internal Server Error',
				});
			}
			const accessToken = await this.tokenService.generateAccessToken(user);
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
		//console.log(info)

		const workArr = []
		if(user && Object.keys(user).length>0) {
			const updateUser = (transaction) => {
				return new Promise((resolve, reject) => {
					return models.user.update({
						...user
					}, {
						where: { id: userInfoFromToken }
					}, {
						transaction: transaction
					}).then(updatedUser => {
						resolve(updatedUser)
					}).catch(error => {
						reject(error)
					})
				})
			}
			workArr.push(updateUser)
		}

		if(likes && Object.keys(likes).length>0) {

				const likesArr = likes.replace(/\[|\]/g, '').split(',') // like의 형태는 ['1', '2']와 같은 배열 형태의 문자열임
				likesArr.forEach((elements) => {
					if(elements !== ''){ //빈 문자열 제외(빈 배열일경우 빈문자열로 받아지는 경우라 제외)
						const insertLikes = (transaction) => { // 프로미스의 형태로 새 transaction을 생성할 것이므로 transaction을 매개변수로 받는 함수 형태로 만듦
							return new Promise((resolve, reject) => { //일반적인 프로미스 생성 형태
								return models.category_has_user.create({ // 중간중간 정확하게 리턴해주는것이 중요
									category_id: elements,
									user_id: userInfoFromToken.id,
								}, {transaction: transaction}).then(insertedLikes => { //sequelize 모델의 함수 사용시 transaction 설정해야함, 여기서는 매개변수로 받는 transaction임
									resolve(insertedLikes) //성공했을때 넘어가는 값은 방금 호출로 생성된 관심카테고리
								}).catch(error => {
									reject(error) //밑에서 다시 serviceunavilable exception 생성할 것이므로 그냥 error 만 넘겨줌
								})
							})
						}
						workArr.push(insertLikes)  //promise.all이 iterable 요소를 받으므로 배열안에 차곡차곡 함수를 쌓아줌
					}
				})
		}

		if(address && Object.keys(address).length>0) {
			const insertAddress = (transaction) => {
				return new Promise((resolve, reject) => {
					return models.user_address.update({
						...address,
					}, {
						where:{
							user_id: userInfoFromToken
						}
					}, {transaction: transaction}).then(insertedAddress => {
						resolve(insertedAddress)
					}).catch(error => {
						reject(error)
					})
				})
			}
			workArr.push(insertAddress)
		}
		//console.log(infoArr)
		const deleteLikes = (transaction) => {
			return new Promise((resolve, reject) => {
				return models.category_has_user.destroy({
					where: { user_id: userInfoFromToken.id }
				}, {transaction: transaction}).then(deletedLikes => {
					resolve(deletedLikes)
				}).catch(error => {
					transaction.rollback() //여기서도 롤백
					reject(error)
				})
			})
		}

		return new Promise((resolve, reject) => {  //실실적인 create 메서드의 리턴문
			console.log(workArr[0]) 
			return models.sequelize.transaction().then(async (transaction) => { //트랜잭션 생성 후 넘겨줌
				if(likes && Object.keys(likes).length>0){
					await deleteLikes(transaction)
				}
				
				return Promise.all(
					workArr.map(insertFunc => { 
						return insertFunc(transaction) // 이 시점에서 프로미스가 pending이 되나요?? 저도잘모르겠습니다
					})
				).then(values => {
					console.log(values, 'resolve')
					transaction.commit() // 성공했을 경우 지금 transaction은 unmanaged transaction 이라 수동으로 commit을 해주어야 함
					resolve({message: 'successful'})
				}).catch(error => {
					console.log(error, '에러')
					transaction.rollback() // 에러 발생 시에도 똑같이 수동으로 rollback 해주어야 함
					reject(new ServiceUnavailableException('a network-related or database instance-specific error occurred while inserting new data')) //에러 발생시 응답
				})
			})
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

	async getNotification(user_id: number) {
		if (!user_id) {
			throw new BadRequestException('at least user_id is needed for query');
		} else {
			const notifications = await models.notification.findAll({
				where: {
					user_id: user_id,
				},
			});
			// console.log(JSON.parse(notifications[0].contents))
			return { data: notifications, message: 'successful' };
		}
	}

	async updateNotification(data: UpdateNotificationDto) {
		const result = await sequelize
			.transaction(async (t) => {
				const isUpdated = await models.notification.update(
					{ read: data.read },
					{
						where: {
							id: data.notification_id,
						},
						transaction: t,
					},
				);
				if (isUpdated) {
					return { message: 'notification updated successfully' };
				}
			})
			.then((result: any) => {
				return result;
			})
			.catch((err: any) => {
				return err;
			});
		return result;
	}
}
