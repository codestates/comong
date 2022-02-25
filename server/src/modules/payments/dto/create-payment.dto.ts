import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, IsEnum } from 'class-validator';
import { PaymentStatus } from '../entities/statusEnum.entity';

export class CreatePaymentDto {
	@ApiProperty({
		example: 2,
		description: 'user_id',
		required: true,
	})
	@IsNumber()
	readonly user_id: number;

	@ApiProperty({
		example: "213#1645686591873",
		description: 'order_id',
		required: true,
	})
	@IsString()
	readonly order_id: string;

	@ApiProperty({
		example: 'card',
		description: 'payment_method',
		required: false,
	})
	@IsOptional()
	@IsString()
	readonly payment_method: string;

	@ApiProperty({
		example: 3500,
		description: 'total_amount',
		required: true,
	})
	@IsNumber()
	readonly total_amount: number;

	@ApiProperty({
		example: 'imp_840754587057',
		description: 'imp_uid',
		required: false,
	})
	@IsOptional()
	@IsString()
	readonly imp_uid: string;

	@ApiProperty({
		example: 'min_1644897058125',
		description: 'merchant_uid',
		required: false,
	})
	@IsOptional()
	@IsString()
	readonly merchant_uid: string;

	@ApiProperty({
		example: '홍길동',
		description: 'buyer_name',
		required: true,
	})
	@IsString()
	readonly buyer_name: string;

	@ApiProperty({
		enum: ['paid', 'pending'],
		example: 'paid',
		description: 'status',
		required: true,
	})
	@IsString()
	@IsEnum(PaymentStatus)
	readonly status: string;

	@ApiProperty({
		example: '서울특별시 종로구 청와대로 1',
		description: 'address_line1',
		required: true,
	})
	@IsString()
	readonly address_line1: string;

	@ApiProperty({
		example: '대통령 비서실',
		description: 'address_line2',
		required: false,
	})
	@IsString()
	@IsOptional()
	readonly address_line2: string;

	@ApiProperty({
		example: '03048',
		description: 'postal_code',
		required: true,
	})
	@IsString()
	readonly postal_code: string;

	@ApiProperty({
		example: 'webmaster@president.go.kr',
		description: 'email',
		required: true,
	})
	@IsString()
	readonly email: string;

	@ApiProperty({
		example: '010-1234-5678',
		description: 'contact',
		required: true,
	})
	@IsString()
	readonly contact: string;
}
