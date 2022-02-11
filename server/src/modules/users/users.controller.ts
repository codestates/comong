import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiBadGatewayResponse, ApiOkResponse, ApiBadRequestResponse, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
@ApiTags('회원 정보 관련')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: '회원 가입', description: '회원 가입 요청을 받습니다.' })
  @ApiCreatedResponse({ description: 'successful.' })
  @ApiBadRequestResponse({ description: 'invalid value for property' })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @ApiHeader({
    name: 'Authorization',
    description: '사용자 인증 수단, 액세스 토큰 값',
    required: true,
    schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf'
    },
  })
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '회원 정보 수정', description: '회원 정보를 변경합니다.' })
  @ApiOkResponse({ description: 'successful'})
  @ApiBadRequestResponse({ description: 'invalid value for property or account' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiHeader({
    name: 'Authorization',
    description: '사용자 인증 수단, 액세스 토큰 값',
    required: true,
    schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf'
    },
  })
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '회원 탈퇴', description: '회원 탈퇴를 요청합니다.' })
  @ApiOkResponse({ description: 'successful'})
  @ApiBadRequestResponse({ description: 'given account does not exist' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('/signin')
  @ApiOperation({ summary: '로그인', description: '로그인 요청을 받습니다.' })
  @ApiCreatedResponse({
    description: 'successful',
    schema: {
      example: {
        id: 'f2e97d26-84d3-4210-aad9-826071c09837',
        email: 'mukzzang@gmail.com',
        name: '박다현',
        gender: 1,
        age: null,
        address1: '서울특별시 성북구 동선동1가',
        address2: null,
        phone: null,
        createdAt: '2022-02-11T15:30:17.221Z',
        updatedAt: '2022-02-11T15:30:17.221Z',
        role: 0,
        accessToken:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzYsIm5pY2tuYW1lIjoiZWtndXMiLCJlbWFpbCI6ImRhaHllb25AZ29vZ2xlLmNvbSIsInJvbGUiOjEsImlhdCI6MTY0NDU2MTQxMCwiZXhwIjoxNjQ0NTY1MDEwfQ.UrWNE9s0gV4t05XRn5HeMyxJ2eSN_myIebnLfpqJKtE',
      },
    },
  })
  @ApiBadRequestResponse({ description: 'invalid value for property' })
  findAll(@Body() signInUserDto: SignInUserDto) {
    return this.usersService.findAll(signInUserDto);
  }

  @Get('/signout')
  @ApiHeader({
    name: 'Authorization',
    description: '사용자 인증 수단, 액세스 토큰 값',
    required: true,
    schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf'
    },
  })
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '로그 아웃', description: '로그아웃 요청을 받습니다.' })
  @ApiOkResponse({ description: 'successful'})
  @ApiBadRequestResponse({ description: 'Authorization has expired' })
  findOne() {
    return this.usersService.findOne();
  }
}
