import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional,  IsString, IsBoolean } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: '박다현',
        description: '이름',
        required: true,
    })
    @IsString()
    readonly name: string;

    @ApiProperty({
        example: 'mukzzang@gmail.com',
        description: '이메일',
        required: true,
    })
    @IsString()
    readonly email: string;

    @ApiProperty({
        example: 'pwHJIFp1TsZ82AEnH9VtrFJNHg3ylOywhO2kmgJJKWdqkSGerg',
        description: '비밀번호',
        required: true,
    })
    @IsString()
    readonly password: string;

    @ApiProperty({
        example: '01012345678',
        description: '연락처',
        required: false,
    })
    @IsOptional()
    @IsString()
    readonly phone: string;

    @ApiProperty({
        example: '1',
        description: '성별',
        required: false,
    })
    @IsOptional()
    @IsNumber()
    readonly gender: number;

    @ApiProperty({
        example: '[1,2,3]',
        description: '관심 카테고리 배열',
        required: false,
    })
    @IsOptional()
    @IsString()
    readonly likes: string;

    @ApiProperty({
        example: '서울특별시 중구 태평로1가 100-100',
        description: '주소',
        required: false,
    })
    @IsOptional()
    @IsString()
    address1: string;

    @ApiProperty({
        example: '101동 101호.',
        description: '상세 주소',
        required: false,
    })
    @IsOptional()
    @IsString()
    address2: string;

    @ApiProperty({
        example: '2000-01-01',
        description: '생년월일',
        required: false,
    })
    @IsOptional()
    @IsString()
    dob: Date;
    
    @ApiProperty({
        example: '0',
        description: '회원 구분',
        required: false,
    })
    @IsNumber()
    role: number;
}
