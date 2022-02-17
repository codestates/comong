import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsEnum } from 'class-validator';
import { PaymentStatus } from '../../payments/entities/statusEnum.entity';

export class CreateOrderDetailDto {
	@ApiProperty({
		example: 2,
		description: 'user_id',
		required: true,
	})
	@IsNumber()
	readonly user_id: number;

	@ApiProperty({
		example: 579,
		description: 'item_id',
		required: true,
	})
	@IsNumber()
	readonly item_id: number;
	
  @ApiProperty({
		example: 3,
		description: 'order_amount',
		required: true,
	})
	@IsNumber()
	readonly order_amount: number;
	
  @ApiProperty({
		example: 56000,
		description: 'peritem_price',
		required: true,
	})
	@IsNumber()
	readonly peritem_price: number;
	
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
