import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MailerModule } from '../mailer/mailer.module';
import { SocketModule } from '../socket/socket.module';
import { AppGateway } from 'src/app.gateway';


@Module({
  imports: [MailerModule, SocketModule],
  controllers: [OrdersController],
  providers: [OrdersService, AppGateway]
})
export class OrdersModule {}
