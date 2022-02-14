import { ApiProperty } from "@nestjs/swagger";

export class CreateItemDto {
    @ApiProperty({
        example: 'Comong 코끼리 인형 + 100cm 바디필로우 세트',
        description: '제목',
        required: true,
    })
    title: string;

    @ApiProperty({
        example: '귀여움',
        description: '본문',
        required: true,
    })
    contents: string;

    @ApiProperty({
        example: '[{url: https://imagedelivery.net/BOKuAiJyROlMLXwCcBYMqQ/fe9f218d-5134-4a76-ba20-bf97e5c21900/thumbnail}, {url: https://imagedelivery.net/BOKuAiJyROlMLXwCcBYMqQ/b25fab5f-c1ec-420b-84f2-626857a74500/thumbnail}]',
        description: '본문',
        required: true,
    })
    images: string;

    @ApiProperty({
        example: 1,
        description: '카테고리',
        required: true,
    })
    category: number;

    @ApiProperty({
        example: 59000,
        description: '가격',
        required: true,
    })
    price: number;

    @ApiProperty({
        example: '2022-02-11T15:30:17.221Z',
        description: '생성 날짜',
        required: true,
    })
    createdAt: Date;

    @ApiProperty({
        example: '2022-02-11T15:30:17.221Z',
        description: '수정 날짜',
        required: true,
    })
    updatedAt: Date;
}
