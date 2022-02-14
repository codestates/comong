import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UsePipes,
	ValidationPipe,
	UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user.dto';
import {
	ApiTags,
	ApiOperation,
	ApiCreatedResponse,
	ApiBadGatewayResponse,
	ApiOkResponse,
	ApiBadRequestResponse,
	ApiHeader,
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiParam,
} from '@nestjs/swagger';
import JwtAuthGuard from '../../middleware/Jwtauthguard';
import { getUser } from '../../decorators/getUser'
import { User } from './entities/user.entity';

@Controller('users')
@ApiTags('회원 정보 관련')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiOperation({
		summary: '회원 가입',
		description: '회원 가입 요청을 받습니다.',
	})
	@ApiCreatedResponse({ description: 'successful.' })
	@ApiBadRequestResponse({ description: 'invalid value for property' })
	@UsePipes(ValidationPipe)
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get('isduplicate/:email')
	@ApiOperation({
		summary: '이메일 중복 검사',
		description: '이메일의 중복 여부를 검사합니다.',
	})
	@ApiParam({
		name: 'email',
		required: true,
		description: '중복 검사를 시행할 이메일 주소',
	})
	@ApiOkResponse({ description: 'available' })
	@ApiForbiddenResponse({ description: 'This email address is already being used' })
	isDuplicate(@Param('email') email: string) {
		return this.usersService.isDuplicate(email)
	}

	@Patch()
	@ApiHeader({
		name: 'Authorization',
		description: '사용자 인증 수단, 액세스 토큰 값',
		required: true,
		schema: {
			example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf',
		},
	})
	@ApiBearerAuth('accessToken')
	@ApiOperation({
		summary: '회원 정보 수정',
		description: '회원 정보를 변경합니다.',
	})
	@ApiOkResponse({ description: 'successful' })
	@ApiBadRequestResponse({
		description: 'invalid value for property or account',
	})
	@UseGuards(JwtAuthGuard)
	update(@getUser() user: User,@Body() changes: UpdateUserDto) {
		return this.usersService.update(user, changes);
	}

	@Delete()
	@ApiHeader({
		name: 'Authorization',
		description: '사용자 인증 수단, 액세스 토큰 값',
		required: true,
		schema: {
			example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf',
		},
	})
	@ApiBearerAuth('accessToken')
	@ApiOperation({
		summary: '회원 탈퇴',
		description: '회원 탈퇴를 요청합니다.',
	})
	@ApiOkResponse({ description: 'successful' })
	@ApiBadRequestResponse({ description: 'given account does not exist' })
	@UseGuards(JwtAuthGuard)
	remove(@getUser() user: User) {
		return this.usersService.remove(user);
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
	signIn(@Body() userInfo: SignInUserDto) {
		return this.usersService.signIn(userInfo);
	}

	@Get('/signout')
	@ApiHeader({
		name: 'Authorization',
		description: '사용자 인증 수단, 액세스 토큰 값',
		required: true,
		schema: {
			example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf',
		},
	})
	@ApiBearerAuth('accessToken')
	@ApiOperation({
		summary: '로그 아웃',
		description: '로그아웃 요청을 받습니다.',
	})
	@ApiOkResponse({ description: 'successful' })
	@ApiBadRequestResponse({ description: 'Authorization has expired' })
	@UseGuards(JwtAuthGuard)
	signOut(@getUser() user: User) {
		
		return this.usersService.signOut(user);
	}
}
