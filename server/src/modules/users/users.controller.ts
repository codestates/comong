import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiBadGatewayResponse, ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';

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
  @ApiOperation({ summary: '회원 정보 수정', description: '회원 정보를 변경합니다.' })
  @ApiOkResponse({ description: 'successful'})
  @ApiBadRequestResponse({ description: 'invalid value for property or account' })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '회원 탈퇴', description: '회원 탈퇴를 요청합니다.' })
  @ApiOkResponse({ description: 'successful'})
  @ApiBadRequestResponse({ description: 'given account does not exist' })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('/signin')
  @ApiOperation({ summary: '로그인', description: '로그인 요청을 받습니다.' })
  @ApiBadRequestResponse({ description: 'invalid value for property' })
  @ApiOkResponse({ description: 'successful'})
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/signout')
  @ApiOperation({ summary: '로그 아웃', description: '로그아웃 요청을 받습니다.' })
  @ApiBadRequestResponse({ description: 'invalid value for property' })
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }
}
