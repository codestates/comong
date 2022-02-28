import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsBoolean } from 'class-validator';

export class StockManagement {
	@ApiProperty({
		example: 200,
		description: 'insert_item_stock',
		required: true,
	})
	@IsNumber()
	insert_item_stock: number;
}
