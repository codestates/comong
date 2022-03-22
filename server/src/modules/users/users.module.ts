import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MailerModule } from '../mailer/mailer.module'
import { TokenService } from 'src/util/token';
import { MailerService } from '../mailer/mailer.service';
require('dotenv').config()

@Module({
  imports: [MailerModule],
  controllers: [UsersController],
  providers: [UsersService, TokenService, MailerService]
})
export class UsersModule {}
