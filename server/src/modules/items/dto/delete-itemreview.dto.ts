import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class DeleteItemReviewDto {
	@ApiProperty({
		example: 4,
		description: 'item_review_id',
		required: true,
	})
	@IsNumber()
	item_review_id: number;
}
