import {
	Controller,
	Query,
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
	ApiQuery,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiBadRequestResponse,
	ApiHeader,
	ApiBearerAuth,
	ApiForbiddenResponse,
	ApiParam,
	ApiInternalServerErrorResponse,
	ApiResponse,
} from '@nestjs/swagger';
import JwtAuthGuard from '../../middleware/Jwtauthguard';
import { getUser } from '../../decorators/getUser';
import { User } from './entities/user.entity';
import { BcryptPasswordHashPipe } from 'src/util/bcryptpasswordhashpipe';
import { BcryptPasswordValidationPipe } from 'src/util/bcrypepasswordvalidationpipe';
import { signUpTransformPipe } from './pipe/signuptransformpipe';

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
	@ApiResponse({
		status: 200,
		description: 'an confirmation letter has been sent',
	})
	@ApiBadRequestResponse({ description: 'invalid value for property' })
	@ApiInternalServerErrorResponse({
		description: 'service unavailable(mailer)',
	})
	@UsePipes(ValidationPipe)
	@UsePipes(BcryptPasswordHashPipe)
	//@UsePipes(signUpTransformPipe)
	async create(@Body(new signUpTransformPipe()) user: CreateUserDto) {
		return this.usersService.create(user);
	}

	@Get('address')
	@ApiOperation({
		summary: '주소 정보',
		description: '주소 정보를 요청합니다.',
	})
	@ApiOkResponse({ description: 'successful' })
	@ApiInternalServerErrorResponse({ description: 'service unavailable' })
	@ApiBearerAuth('accessToken')
	@UseGuards(JwtAuthGuard)
	getAddress(@getUser() user: User): Promise<{}> {
		return this.usersService.getAddress(user);
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
	@ApiForbiddenResponse({
		description: 'This email address is already being used',
	})
	isDuplicate(@Param('email') email: string) {
		return this.usersService.isDuplicate(email);
	}

	@Get('verifications/:code')
	@ApiOperation({
		summary: '이메일 인증 확인',
		description:
			'판매자 회원 이메일 인증 과정에서 이메일에 첨부되는 링크 주소로 호출 시 인증 완료로 간주합니다.',
	})
	@ApiParam({
		name: 'code',
		required: true,
		description: '일회성 코드',
	})
	@ApiOkResponse({ description: 'available' })
	@ApiForbiddenResponse({
		description: 'This email address is already being used',
	})
	verification(@Param('code') code: string) {
		return this.usersService.verification(code);
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
	@UsePipes(BcryptPasswordHashPipe)
	update(
		@getUser() user: User,
		@Body(new signUpTransformPipe()) changes: UpdateUserDto,
	) {
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
				likes: {},
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
	@UsePipes(BcryptPasswordValidationPipe)
	signIn(@Body() userInfo: SignInUserDto) {
		return this.usersService.signIn(userInfo);
	}

	@Get('/token')
	@ApiOperation({
		summary: '엑세스 토큰 재발급',
		description: '리프레시 토큰 인증을 통해 엑세스 토큰을 갱신합니다.',
	})
	@ApiOkResponse({ description: 'successful' })
	@ApiBadRequestResponse({ description: 'refreshtoken has expired' })
	reissueToken() {
		return 0;
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

	@Get('/notification')
	@ApiHeader({
		name: 'Authorization',
		description: '사용자 인증 수단, 액세스 토큰 값',
		required: true,
		schema: {
			example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf',
		},
	})
	@ApiOperation({
		summary: '알림내역',
		description: '알림내역을 가져오는 요청을 보냅니다 by user_id',
	})
	@ApiQuery({
		name: 'user_id',
		required: true,
		description: '유저 아이디',
	})
	@ApiOkResponse({
		description: 'successful',
	})
	// @UseGuards(JwtAuthGuard)
	getNotification(@Query('user_id') user_id: number) {
		return this.usersService.getNotification(user_id);
	}

	@Patch('/notification')
	@ApiHeader({
		name: 'Authorization',
		description: '사용자 인증 수단, 액세스 토큰 값',
		required: true,
		schema: {
			example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf',
		},
	})
	@ApiOperation({
		summary: '알림내역 업데이트',
		description: '알림내역 업데이트 요청을 보냅니다',
	})
	@ApiQuery({
		name: 'user_id',
		required: true,
		description: '유저 아이디',
	})
	@ApiOkResponse({
		description: 'successful',
	})
	// @UseGuards(JwtAuthGuard)
	updateNotification(@Query('user_id') user_id: number) {
		return this.usersService.updateNotification(user_id);
	}
}
