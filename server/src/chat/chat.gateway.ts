import { UseGuards } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { User } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { ChatService } from './chat.service';

@WebSocketGateway({
  cors: {
    origin: 'https://hoppscotch.io/',
  },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer() server: Server;

  afterInit(server: Server) {
    console.log(server);
  }

  async handleConnection(client: Socket) {
    // const user: User = await this.userService.findOne();
    console.log(`----------------Connection-------------`);
    console.log(`Connected ${client.id}`);
    //Do stuffs
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
    //Do stuffs
  }

  @SubscribeMessage('conversation')
  async handleSendMessage(client: Socket, conversation: string) {
    // await this.chatService.createMessage(conversation);
    // this.server.emit('recMessage', conversation);
    return 'Hello World!';
  }
}
