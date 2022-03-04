import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional,  IsString, IsBoolean } from "class-validator";

export class DeleteNotificationDto {
    @ApiProperty({
        example: 1,
        description: 'notification_id',
        required: true,
    })
    @IsNumber()
    readonly notification_id: number;
}
