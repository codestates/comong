import { Module } from '@nestjs/common';
import { SocketController } from './socket.controller';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { SocketIoClientProvider } from './socket.clientprovider';

@Module({
  controllers: [SocketController],
  providers: [SocketService, SocketGateway, SocketIoClientProvider]
})
export class SocketModule {}
