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

const corsOptions = {
	origin: '*',
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true,
};

@WebSocketGateway({
	namespace: '/chat',
	cors: corsOptions,
	transports: ['websocket'],
})

export class SocketGateway
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer() server: Server;
	private logger: Logger = new Logger('AppGateway');

	afterInit(server: any): any {
		this.logger.log('Initialized');
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

	@SubscribeMessage('leave_room')
	handleLeaveRoom(client: Socket, room: string) {
		const message = `${client.id} has joined the chat room: ${room}`;
		this.logger.log(message);
		client.leave(room);
		client.emit('leftRoom', room);
	}

	@SubscribeMessage('chatToServer')
	async handleMessage(
		client: Socket,
		message: {
			nickname: string;
			room: string;
			text: string;
		},
	) {
		console.log(message);
		this.server.to(message.room).emit('chatToClient', message);
	}

	@SubscribeMessage('sendNotification')
	async handleNotification(
		client: Socket,
		message: {
			nickname: string;
			room: string;
			text: string;
			data: object;
		},
	) {
		console.log(message);
		this.server.to(message.room).emit('notificationToClient', message.text, message.data);
	}

	handleDisconnect(client: Socket, ...args: any[]) {
		this.logger.log(`Client disconnected: ${client.id}`);
	}
}
