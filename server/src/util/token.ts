import { BadRequestException, Injectable, BadGatewayException, InternalServerErrorException, Response } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import { response } from 'express'
require('dotenv').config()


@Injectable()
export class TokenService{

    async generateAccessToken(payload: {password?: string}): Promise<string>{
        //console.log(payload)
        console.log(process.env.COMONG_ACCESS_SECRET)
        if(payload['password']){
            delete payload.password
        }
        //console.log(payload)
        const accessToken = await jwt.sign(payload, process.env.COMONG_ACCESS_SECRET, {
            expiresIn: '1h',
        });

        return accessToken
    }

    generateRefreshToken(payload: {password?: string}): void{
        //console.log(payload)
        if(payload['password']){
            delete payload.password
        }
        console.log(payload)
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
            expiresIn: '1h',
        });
        response.cookie('refreshToken', accessToken, {
            httpOnly: true,
            domain: 'test.comong.kr', // your domain here!
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
          }).send()
    }

}