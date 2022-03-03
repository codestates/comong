import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MailerModule } from '../mailer/mailer.module';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [MailerModule],
  controllers: [PaymentsController],
  providers: [PaymentsService, AppGateway]
})


export class PaymentsModule {}
