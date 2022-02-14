import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TokenModule } from '../../util/token.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
require('dotenv').config()

@Module({
  imports: [ JwtModule.register(({
    secret: process.env.ACCESS_SECRET,
    signOptions: { expiresIn: '30m' },
  })),
],
  controllers: [UsersController],
  providers: [UsersService, TokenModule]
})
export class UsersModule {}
