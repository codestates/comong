import {
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
	OnGatewayInit,
	OnGatewayConnection,
	OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { SocketService } from './modules/socket/socket.service';

const corsOptions = {
	origin: '*',
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true,
};

@WebSocketGateway({
	namespace: '/app',
	cors: corsOptions,
	transports: ['websocket'],
})
export class AppGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	constructor(private socketService: SocketService) {}
	@WebSocketServer() server: Server;
	private logger: Logger = new Logger('AppGateway');

	afterInit(server: Server) {
		this.socketService.socket = server;
	}

	handleConnection(client: Socket) {
		this.logger.log(`Client connected: ${client.id}`);
	}

	@SubscribeMessage('sendNotification')
	async handleNotification(message: object) {
		console.log(message);
		this.server
			.to('testroomname01')
			.emit('notificationToClient', message);
	}

	handleDisconnect(client: Socket, ...args: any[]) {
		this.logger.log(`Client disconnected: ${client.id}`);
	}
}
