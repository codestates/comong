import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MailerModule } from '../mailer/mailer.module';


@Module({
  imports: [MailerModule],
  controllers: [PaymentsController],
  providers: [PaymentsService]
})


export class PaymentsModule {}
