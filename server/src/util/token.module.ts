import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class TokenModule {
  constructor(private readonly jwt: JwtService) {}
  
  generateToken(payload: object): string {
    return this.jwt.sign(payload, { secret: process.env.ACCESS_SECRET, expiresIn: '1h'})
  }
  

} 