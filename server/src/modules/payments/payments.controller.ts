import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import JwtAuthGuard from '../../middleware/Jwtauthguard';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiBadGatewayResponse, ApiOkResponse, ApiBadRequestResponse, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';

@Controller('payments')
@ApiTags('결제')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  @ApiHeader({
    name: 'Authorization',
    description: '사용자 인증 수단, 액세스 토큰 값',
    required: true,
    schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf'
    },
  })
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '새로운 결제 정보 생성', description: '결제 결제 정보를 생성합니다.' })
  @ApiCreatedResponse({ description: 'successful.' })
  @ApiBadRequestResponse({ description: 'invalid value for property' })
  // @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Post('/approve')
  @ApiHeader({
    name: 'Authorization',
    description: '사용자 인증 수단, 액세스 토큰 값',
    required: true,
    schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf'
    },
  })
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '결제 승인', description: '결제 요청을 진행합니다.' })
  @ApiCreatedResponse({ description: 'successful.' })
  @ApiBadRequestResponse({ description: 'invalid value for property' })
  createApprove(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get()
  @ApiHeader({
    name: 'Authorization',
    description: '사용자 인증 수단, 액세스 토큰 값',
    required: true,
    schema: {
      example: 'bearer 23f43u9if13ekc23fm30jg549quneraf2fmsdf'
    },
  })
  @ApiBearerAuth('accessToken')
  @ApiOperation({ summary: '결제 정보', description: '결제 요청을 진행합니다.' })
  @ApiOkResponse({ description: 'successful'})
  @ApiBadRequestResponse({ description: 'invalid value for property' })
  findAll() {
    return this.paymentsService.findAll();
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
  @ApiOperation({ summary: '결제 요청 무효화', description: '결제 요청을 진행합니다.' })
  @ApiOkResponse({ description: 'successful'})
  @ApiBadRequestResponse({ description: 'invalid value for property' })
  remove(@Param('id') id: string) {
    return this.paymentsService.remove(+id);
  }
}
