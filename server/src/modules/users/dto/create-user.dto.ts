import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        example: '박다현',
        description: '이름',
        required: true,
    })
    name: string;

    @ApiProperty({
        example: 'mukzzang@google.com',
        description: '이메일',
        required: true,
    })
    email: string;

    @ApiProperty({
        example: '446D8hmDWUGnkb7KweQPkMaWRgWBCo...',
        description: '비밀번호',
        required: true,
    })
    password: string;

    @ApiProperty({
        example: '01012345678',
        description: '연락처',
        required: false,
    })
    phone: bigint;

    @ApiProperty({
        example: '1',
        description: '성별',
        required: false,
    })
    gender: boolean;

    @ApiProperty({
        example: '2000-01-01',
        description: '생년월일',
        required: false,
    })
    dob: Date;
    
}
