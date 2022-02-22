import { CreateItemDto } from './create-item.dto';
import { ApiProperty, PartialType } from "@nestjs/swagger";

export class UpdateItemDto extends PartialType(CreateItemDto) {
}
