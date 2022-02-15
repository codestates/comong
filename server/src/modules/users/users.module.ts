import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MailerModule } from '../mailer/mailer.module'
require('dotenv').config()

@Module({
  imports: [MailerModule],
  controllers: [UsersController],
  providers: [UsersService, TokenModule]
})
export class UsersModule {}
