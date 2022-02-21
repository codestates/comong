import { ApiProperty } from '@nestjs/swagger';
import {
	IsNumber,
} from 'class-validator';

export class DeleteOrderdetailDto {
  @ApiProperty({
		example: 13,
		description: 'order_detail_id',
		required: true,
	})
	@IsNumber()
	readonly order_detail_id: number;
}
