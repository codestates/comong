import * as dotenv from 'dotenv';
dotenv.config();

import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    HttpModule,
    JwtModule.register({
      secret: process.env.ACCESS_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [OauthController],
  providers: [OauthService, AuthService],
})
export class OauthModule {}
