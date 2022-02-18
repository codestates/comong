import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ItemsModule } from './modules/items/items.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { OauthModule } from './modules/oauth/oauth.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ChatsModule } from './modules/chats/chats.module';
import { CommentsModule } from './modules/comments/comments.module';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter'
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';
import { config } from '../src/config/config';
import * as path from 'path'

const mailerInitSettings = {
  auth: `smtps://comong2022@gmail.com:zhahd2022@@smtp.gmail.com`,
  senderInfo: `Comong <admin@comong.kr>`,
}

@Module({
  imports: [UsersModule, ItemsModule, PaymentsModule, OauthModule, OrdersModule, ChatsModule, CommentsModule,
  MailerModule.forRootAsync({
    useFactory: (): object => {
      return {
        transport: mailerInitSettings.auth,
        defaults: {
          from: mailerInitSettings.senderInfo,
        },
        template: {
          dir: path.join(__dirname, '/templates/'),
          adapter: new EjsAdapter(),
          options: {
            strict: true,
          }
        },
      }
    },
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
