import * as dotenv from 'dotenv';
dotenv.config();

import { Body, Controller, Post, Response } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { OauthReqDto } from './dto/oauthReq.dto';
import { OauthService } from './oauth.service';

@Controller('oauth')
@ApiTags('Oauth 2.0 Login')
export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Post('oauthgoogle')
  @ApiOperation({ summary: 'Sign in or Sign up with Google Oauth 2.0', description: 'receive authorizationCode and rewturn login information '})
  @ApiCreatedResponse({ description: 'successful' })
  getResfromGoogle(@Body() authorizationCode: OauthReqDto, @Response() res: any) {
    const code = authorizationCode.authorizationCode;
    const getTokenurl = `https://oauth2.googleapis.com/token?client_id=${process.env.GOOGLE_CLIENT_ID}&client_secret=${process.env.GOOGLE_CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.GOOGLE_REDIRECT_URL}`;
    this.oauthService.googleOauthlogin(getTokenurl, res);
  }

  @Post('oauthkakao')
  @ApiOperation({ summary: 'Sign in or Sign up with Kakao Oauth 2.0', description: 'receive authorizationCode and rewturn login information '})
  @ApiCreatedResponse({ description: 'successful' })
  getResfromKakao(@Body() authorizationCode: OauthReqDto, @Response() res: any) {
    const code = authorizationCode.authorizationCode;
    const getTokenurl = `https://kauth.kakao.com/oauth/token?code=${code}&client_id=${process.env.KAKAO_CLIENT_ID}&client_secret=${process.env.KAKAO_CLIENT_SECRET}&redirect_uri=${process.env.KAKAO_REDIRECT_URL}&grant_type=authorization_code`;
    this.oauthService.kakaoOauthlogin(getTokenurl, res);
  }

  @Post('oauthnaver')
  @ApiOperation({ summary: 'Sign in or Sign up with Naver Oauth 2.0', description: 'receive authorizationCode and rewturn login information '})
  @ApiCreatedResponse({ description: 'successful' })
  getResfromnaver(@Body() authorizationCode: OauthReqDto, @Response() res: any) {
    const code = authorizationCode.authorizationCode;
    const getTokenurl = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.NAVER_CLIENT_ID}&client_secret=${process.env.NAVER_CLIENT_SECRET}&code=${code}`;
    this.oauthService.naverOauthlogin(getTokenurl, res);
  }
}
