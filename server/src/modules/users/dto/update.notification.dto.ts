import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional,  IsString, IsBoolean } from "class-validator";

export class UpdateNotificationDto {
    @ApiProperty({
        example: 1,
        description: 'notification_id',
        required: true,
    })
    @IsNumber()
    readonly notification_id: number;

    @ApiProperty({
        example: 1,
        description: 'read',
        required: true,
    })
    @IsString()
    readonly read: number;
}
