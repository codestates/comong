import { Module, Global } from '@nestjs/common';
import { SocketController } from './socket.controller';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';

@Global()
@Module({
	controllers: [SocketController],
	providers: [
		SocketService,
		SocketGateway,
	],
	exports: [SocketService]
})
export class SocketModule {}
