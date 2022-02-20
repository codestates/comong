import { Module } from '@nestjs/common';
import { SocketController } from './socket.controller';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';

@Module({
  controllers: [SocketController],
  providers: [SocketService, SocketGateway]
})
export class SocketModule {}
