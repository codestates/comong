import * as dotenv from 'dotenv';
dotenv.config();

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { ItemsModule } from './modules/items/items.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { OauthModule } from './modules/oauth/oauth.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ChatsModule } from './modules/chats/chats.module';
import { CommentsModule } from './modules/comments/comments.module';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailerModule } from '@nestjs-modules/mailer';
import { SocketModule } from './modules/socket/socket.module';
import * as path from 'path';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
		UsersModule,
		ItemsModule,
		PaymentsModule,
		OauthModule,
		OrdersModule,
		ChatsModule,
		CommentsModule,
		SocketModule,
		MailerModule.forRootAsync({
			useFactory: (): object => {
				return {
					transport: process.env.EMAIL_ADMIN_AUTH,
					defaults: {
						from: process.env.EMAIL_ADMIN_SENDERINFO,
					},
					template: {
						dir: path.join(__dirname, '/templates/'),
						adapter: new EjsAdapter(),
						options: {
							strict: true,
						},
					},
				};
			},
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
