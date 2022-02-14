import { Injectable, Response } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ValidateUserDto } from './dto/validateUser-auth.dto';
const models = require('../../models/index');

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  
  async validateUser(validateUserDto: ValidateUserDto): Promise<any> {
    const user = await models.user.findOne({
      where: {
        email: validateUserDto.email,
      },
    });
    if (user && user.dataValues.password === validateUserDto.password) {
      const result = {
        id: user.dataValues.id,
        nickname: user.dataValues.nickname,
        email: user.dataValues.email,
      };
      return result;
    }
    return null;
  }

  async tokenMaker(user: any) {
    const payload = {
      id: user.dataValues.id,
      nickname: user.dataValues.nickname,
      email: user.dataValues.email,
    };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.REFRESH_SECRET,
      expiresIn: '15d',
    });
    const newResponse = {
      accessToken: accessToken,
      email: user.dataValues.email,
      nickname: user.dataValues.nickname,
    };
    // console.log(refreshToken)

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
      // console.log(newRefreshToken)
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
      // console.log(updatedRefreshToken);
      return { newResponse: newResponse, refreshToken: refreshToken };
    }
  };


}
