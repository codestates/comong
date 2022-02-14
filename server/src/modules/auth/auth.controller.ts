import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { ValidateUserDto } from './dto/validateUser-auth.dto';

@Controller('auth')
@ApiTags('인증 관련')

export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Get()
    validateUser(@Body() validateUserDto: ValidateUserDto) {
        return this.authService.validateUser(validateUserDto)
    }
}