import { BadRequestException, Injectable, BadGatewayException, InternalServerErrorException, Response } from '@nestjs/common';
import * as jwt from 'jsonwebtoken'
import { response } from 'express'

Injectable()
export class TokenService{

    generateAccessToken(payload: {password?: string}): string{
        //console.log(payload)
        if(payload['password']){
            delete payload.password
        }
        //console.log(payload)
        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, {
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