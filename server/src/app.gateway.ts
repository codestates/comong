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
	transports: ['websocket', 'polling'],
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

	@SubscribeMessage('join_room')
	handleJoinRoom(client: Socket, room: string) {
		const message = `${client.id} has joined the chat room: ${room}`;
		this.logger.log(message);
		client.join(room);
		client.emit('joinedRoom', room);
	}

	@SubscribeMessage('notificationToServer')
	async handleNotification(room:string, message: object) {
		// console.log(typeof message);
		this.server
			.to(room)
			.emit('notificationToClient', message);
	}

	handleDisconnect(client: Socket, ...args: any[]) {
		this.logger.log(`Client disconnected: ${client.id}`);
	}
}
