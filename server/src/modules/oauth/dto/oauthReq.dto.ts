import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class OauthReqDto {
  @ApiProperty({
    example: 'iE99U1Cd6FChl4hyld',
    description: 'authorizationCode',
    required: true
  })
  @IsString()
  readonly authorizationCode: string;
}