import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
require('dotenv').config()

export default class JwtAuthGuard implements CanActivate {
	public canActivate(context: ExecutionContext): boolean {
		// CanActivate를 implements 하였으므로, canActivate 함수를 구현해야 합니다.
		const request = context.switchToHttp().getRequest();
		// 클라이언트에서 보낸 request 정보를 읽어옵니다.

		const { authorization } = request.headers;
		const accessToken = authorization.split(' ')[1]
		// 사용자가 헤더에 보낸 access_token key값의 토큰값.

		if (authorization === undefined) {
			// 토큰이 전송되지 않았다면
			//console.log(request.headers)
			throw new BadRequestException( '토큰이 전송되지 않았습니다.');
		}

		request.user = this.validateToken(accessToken);
		//console.log(authorization)
		// request.user 객체에 디코딩된 토큰(유저 정보)을 저장합니다.
		return true;
	}

	public validateToken(token: string): any {
		try {
			//console.log(token, process.env.ACCESS_SECRET)
			const verify: any = jwt.verify(token, process.env.COMONG_ACCESS_SECRET || process.env.ACCESS_SECRET )
			return verify;
		} catch (error) {
				console.log(error)
			switch (error.message) {
				// 토큰에 대한 오류를 판단합니다.
				case 'INVALID_TOKEN':
				case 'TOKEN_IS_ARRAY':
				case 'NO_USER':
					throw new BadRequestException(401, '유효하지 않은 토큰입니다.');

				case 'EXPIRED_TOKEN':
					throw new BadRequestException(410, '토큰이 만료되었습니다.');

				default:
					throw new BadRequestException(500, error.message);
			}
		}
	}
}
