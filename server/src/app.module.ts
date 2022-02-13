import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ItemsModule } from './modules/items/items.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { OauthModule } from './modules/oauth/oauth.module';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ChatsModule } from './modules/chats/chats.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [UsersModule, ItemsModule, PaymentsModule, OauthModule, AuthModule, OrdersModule, ChatsModule, CommentsModule],
  //controllers: [AppController], 최상위 루트 요청은 사용하지 않습니다.
  providers: [AppService],
})
export class AppModule {}
