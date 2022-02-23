import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsBoolean } from 'class-validator';

export class CreateBookmarkDto {
	@ApiProperty({
		example: 2,
		description: 'user_id',
		required: true,
	})
	@IsNumber()
	user_id: number;

	@ApiProperty({
		example: 450,
		description: 'item_id',
		required: true,
	})
	@IsNumber()
	item_id: number;

	@ApiProperty({
		example: 450,
		description: 'ismarked',
		required: true,
	})
	@IsBoolean()
	ismarked: boolean;
}
