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
		example: 'card',
		description: 'payment_method',
		required: false,
	})
	@IsOptional()
	@IsString()
	readonly payment_method: string;

	@ApiProperty({
		example: 'bundle shipping request',
		description: 'detail',
		required: false,
	})
	@IsOptional()
	@IsString()
	readonly detail: string;

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
		required: false,
	})
	@IsOptional()
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
}
