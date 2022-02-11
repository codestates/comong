import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { ItemsModule } from './modules/items/items.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { OauthModule } from './modules/oauth/oauth.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UsersModule, ItemsModule, PaymentsModule, OauthModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
