import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional,  IsString, IsBoolean } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: '김코몽',
        description: '이름',
        required: true,
    })
    @IsString()
    readonly name: string;

    @ApiProperty({
        example: 'test@comong.kr',
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
        example: 'https://camo.githubusercontent.com/440f82dc3c70325255af7f5ccc2453669d3e4724d1a9b78a06bfd17f341e8790/68747470733a2f2f696d61676564656c69766572792e6e65742f424f4b7541694a79524f6c4d4c5877436342594d71512f39636237366562622d326261372d343939382d343064382d3035366536666535643730302f7075626c6963',
        description: '프로필 이미지',
        required: false
    })
    @IsOptional()
    @IsString()
    readonly myimg_src: string;

    @ApiProperty({
        example: '01012345678',
        description: '연락처1',
        required: false,
    })
    @IsOptional()
    @IsString()
    readonly mobile: string;

    @ApiProperty({
        example: '01012345678',
        description: '연락처2',
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
        example: '08217',
        description: '우편번호',
        required: false,
    })
    @IsOptional()
    @IsString()
    postal_code: string;

    @ApiProperty({
        example: '서울특별시',
        description: '시/도',
        required: false,
    })
    @IsOptional()
    @IsString()
    city: string;

    @ApiProperty({
        example: '대한민국',
        description: '국가',
        required: false,
    })
    @IsOptional()
    @IsString()
    country: string;

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
