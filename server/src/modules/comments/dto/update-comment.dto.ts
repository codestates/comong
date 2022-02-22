import { PartialType } from "@nestjs/swagger";
import { CreateItemReviewDto } from './create-comment.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UpdateItemReviewDto extends PartialType(CreateItemReviewDto) {
  @ApiProperty({
		example: '저렴하고 좋아요',
		description: 'item_review_id',
		required: true,
	})
	@IsNumber()
  item_review_id: number;
}
