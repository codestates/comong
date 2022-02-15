import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional,  IsString, IsBoolean } from "class-validator";

export class SignInUserDto {
    @ApiProperty({
        example: 'mukzzang@gmail.com',
        description: '이메일',
        required: true,
    })
    @IsString()
    email: string;

    @ApiProperty({
        example: 'pwHJIFp1TsZ82AEnH9VtrFJNHg3ylOywhO2kmgJJKWdqkSGerg',
        description: '암호화된 비밀번호',
        required: true,
    })
    @IsString()
    password: string;
}
