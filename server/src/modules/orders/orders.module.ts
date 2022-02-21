import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MailerModule } from '../mailer/mailer.module';

@Module({
  imports: [MailerModule],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
