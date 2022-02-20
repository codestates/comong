import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types'
import { Type } from 'class-transformer';
import { CreateOrderDetailDto } from './create-orderdetail.dto';
import {
	IsNumber,
	IsArray,
	ValidateNested,
} from 'class-validator';

class order_detailPatchDto extends PartialType(CreateOrderDetailDto) {
	@ApiProperty({
		example: 2,
		description: 'id',
		required: true,
	})
  @IsNumber()
	readonly id: number;
}

export class UpdateOrderDetailDto {
	@ApiProperty({
		example: [
			{
				id: 13,
				user_id: 2,
				item_id: 355,
				order_amount: 2,
				peritem_price: 2600,
				status: 'pending',
			},
			{
				id: 13,
				user_id: 2,
				item_id: 355,
				order_amount: 2,
				peritem_price: 2600,
				status: 'pending',
			},
		],
		description: 'patchData',
		required: true,
	})
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => order_detailPatchDto)
	payload: order_detailPatchDto[];
}
