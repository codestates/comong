import { ApiProperty } from "@nestjs/swagger";

export class SignInUserDto {
    @ApiProperty({
        example: 'mukzzang@gmail.com',
        description: '이메일',
        required: true,
    })
    email: string;

    @ApiProperty({
        example: 'pwHJIFp1TsZ82AEnH9VtrFJNHg3ylOywhO2kmgJJKWdqkSGerg',
        description: '암호화된 비밀번호',
        required: true,
    })
    password: string;
}
