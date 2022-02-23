import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateItemReviewDto {
	@ApiProperty({
		example: '저렴하고 좋아요',
		description: 'contents',
		required: true,
	})
	@IsString()
	contents: string;

	@ApiProperty({
		example: 'https://imagedelivery.net/BOKuAiJyROlMLXwCcBYMqQ/98cdacce-c818-45ce-6d85-5a153fd21800/public',
		description: 'image_src',
		required: false,
	})
	@IsString()
  @IsOptional()
	image_src: string;
	
  @ApiProperty({
		example: 5, 
    description: 'score',
		required: true,
	})
	@IsNumber()
	score: number;
	
  @ApiProperty({
		example: 34, 
    description: 'order_detail_id',
		required: true,
	})
	@IsNumber()
  order_detail_id: number;
	
  @ApiProperty({
		example: 2, 
    description: 'user_id',
		required: true,
	})
	@IsNumber()
	user_id: number;
}
