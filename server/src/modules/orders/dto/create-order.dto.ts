import { ApiProperty } from '@nestjs/swagger';
import {
	IsNumber,
	IsString,
	IsEnum,
	IsOptional,
	IsArray,
	ArrayMinSize,
} from 'class-validator';
import { PaymentStatus } from '../../payments/entities/statusEnum.entity';
import { Shipping_status } from '../entities/shipping_statusEnum.entity';

export class CreateOrderDto {
	@ApiProperty({
		example: 150000,
		description: 'total_amount',
		required: true,
	})
	@IsNumber()
	readonly total_amount: number;

	@ApiProperty({
		enum: ['paid', 'pending'],
		example: 'pending',
		description: 'status',
		required: true,
	})
	@IsString()
	@IsEnum(PaymentStatus)
	readonly status: string;

	@ApiProperty({
		example: 2,
		description: 'user_id',
		required: true,
	})
	@IsNumber()
	readonly user_id: number;

	@ApiProperty({
		example: [7, 10],
		description: 'order_detail_id',
		required: true,
	})
	@IsArray()
	@IsNumber({},{ each: true })
	@ArrayMinSize(1)
	readonly order_detail_id: number[];

	@ApiProperty({
		enum: [
			'delivered',
			'processing',
			'paymentdue',
			'canceled',
			'returned',
			'pick-up available',
			'intransit',
		],
		example: 'delivered',
		description: 'shipping_status',
		required: true,
	})
	@IsString()
	@IsEnum(Shipping_status)
	readonly shipping_status: string;

	@ApiProperty({
		example: 'cj대한통운',
		description: 'shipping_company',
		required: false,
	})
	@IsString()
	@IsOptional()
	readonly shipping_company: string;

	@ApiProperty({
		example: '01234567890',
		description: 'shipping_code',
		required: false,
	})
	@IsString()
	@IsOptional()
	readonly shipping_code: string;
}
