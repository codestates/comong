import * as dotenv from 'dotenv';
dotenv.config();

import { Body, Controller, Post, Response } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { OauthReqDto } from './dto/oauthReq.dto';
import { OauthService } from './oauth.service';

@Controller('oauth')
@ApiTags('소셜 로그인 및 가입')

export class OauthController {
  constructor(private readonly oauthService: OauthService) {}

  @Post('oauthgoogle')
  @ApiOperation({ summary: 'Google Oauth2.0 요청', description: 'Github OAuth 2.0 을 통해 가입 및 로그인을 요청합니다.'})
  @ApiCreatedResponse({ description: 'successful' })
  getResfromGoogle(@Body() authorizationCode: OauthReqDto, @Response() res: any) {
    const code = authorizationCode.authorizationCode;
    const getTokenurl = `https://oauth2.googleapis.com/token?client_id=${process.env.COMONG_GOOGLE_CLIENT_ID}&client_secret=${process.env.COMONG_GOOGLE_CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${process.env.COMONG_GOOGLE_REDIRECT_URL}`;
    this.oauthService.googleOauthlogin(getTokenurl, res);
  }

  @Post('oauthkakao')
  @ApiOperation({ summary: 'Kakao Oauth 2.0 요청', description: 'Kakao OAuth 2.0 을 통해 가입 및 로그인을 요청합니다.'})
  @ApiCreatedResponse({ description: 'successful' })
  getResfromKakao(@Body() authorizationCode: OauthReqDto, @Response() res: any) {
    const code = authorizationCode.authorizationCode;
    const getTokenurl = `https://kauth.kakao.com/oauth/token?code=${code}&client_id=${process.env.COMONG_KAKAO_CLIENT_ID}&client_secret=${process.env.COMONG_KAKAO_CLIENT_SECRET}&redirect_uri=${process.env.COMONG_KAKAO_REDIRECT_URL}&grant_type=authorization_code`;
    this.oauthService.kakaoOauthlogin(getTokenurl, res);
  }

  @Post('oauthnaver')
  @ApiOperation({ summary: 'Naver Oauth 2.0 요청', description: 'Naver OAuth 2.0 을 통해 가입 및 로그인을 요청합니다. '})
  @ApiCreatedResponse({ description: 'successful' })
  getResfromnaver(@Body() authorizationCode: OauthReqDto, @Response() res: any) {
    const code = authorizationCode.authorizationCode;
    const getTokenurl = `https://nid.naver.com/oauth2.0/token?grant_type=authorization_code&client_id=${process.env.COMONG_NAVER_CLIENT_ID}&client_secret=${process.env.COMONG_NAVER_CLIENT_SECRET}&code=${code}`;
    this.oauthService.naverOauthlogin(getTokenurl, res);
  }
}
