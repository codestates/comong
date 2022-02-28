import { ApiProperty } from '@nestjs/swagger';
import {
	IsString,
	IsEnum,
	IsOptional,
} from 'class-validator';
import { Shipping_status } from '../entities/shipping_statusEnum.entity';
import { PaymentStatus } from 'src/modules/payments/entities/statusEnum.entity';

export class UpdateOrderDto {
	@ApiProperty({
		example: '213#1645686591873',
		description: 'order_id',
		required: true,
	})
	@IsString()
	readonly order_id: string;

	@ApiProperty({
		enum: ['paid', 'pending', 'canceled'],
		example: 'pending',
		description: 'status',
		required: true,
	})
	@IsString()
	@IsEnum(PaymentStatus)
	readonly status: string;
	
	@ApiProperty({
		enum: [
			'pending',
			'delivered',
			'processing',
			'paymentdue',
			'canceled',
			'returned',
			'pick-up available',
			'intransit',
		],
		example: 'pending',
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
