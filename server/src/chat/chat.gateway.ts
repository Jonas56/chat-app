import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { Server, Socket } from 'socket.io';
import { UsersService } from 'src/users/users.service';
import { ChatService } from './chat.service';

@WebSocketGateway(5001, {
  cors: { origin: '*' },
})
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    private readonly chatService: ChatService,
    private jwtService: JwtService,
    private usersSerivce: UsersService,
  ) {}

  @WebSocketServer() server: Server;

  connectedUsers: string[] = [];

  afterInit(server: Server) {
    console.log(server);
  }

  async handleConnection(client: Socket) {
    console.log(`----------------Connection-------------`);
    try {
      const token = client.handshake.headers.authorization.split(' ')[1];
      const payload = <any>jwt.verify(token, process.env.AT_SECRET);
      const user: User = await this.usersSerivce.findOne(payload.sub._id);
      client.data.user = user;
      // get user conversations
      const users = await this.chatService.getConversationsForUser(user);
      this.server.emit('users', users);
      this.connectedUsers.push(user.username);
    } catch (error) {
      client.disconnect(true);
      console.log(`Disconnected due to exception :  ${error.message}`);
    }
  }

  handleDisconnect(client: Socket) {
    console.log(`Disconnected: ${client.id}`);
  }

  @SubscribeMessage('joinConversation')
  async handleJoinConversation(
    @MessageBody('userId') userId: number,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Conversation with id: ${userId}`);
    const conversation = await this.chatService.getConversation(userId);
    client.emit('conversation', conversation);
    return conversation;
  }

  @SubscribeMessage('createConversation')
  async handleCreateConversation(
    @MessageBody('otherUserId') otherUserId: number,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const conversation = await this.chatService.createConversation(
        client.data.user.id,
        otherUserId,
      );
      client.emit('conversation', conversation);
      return conversation;
    } catch (error) {
      console.log(error.message);
    }
  }

  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody('message') message: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log(`Message: ${message}`);
    const user = client.data.user;
    const conversation = client.data.conversation;
    const createdMessage = await this.chatService.sendMessage(
      conversation.id,
      user.id,
      message,
    );
    this.server.to(client.id).emit('message', message);
    return createdMessage;
  }

  @SubscribeMessage('typing')
  async handleTyping(client: Socket, message: string) {
    // console.log(`Typing: ${message}`);
    // const user = client.data.user;
    // const conversation = client.data.conversation;
    // const message = await this.chatService.createMessage(
    //   conversation,
    //   user,
    //   conversation.messages[conversation.messages.length - 1].id + 1,
    // );
    // this.server.emit('message', message);
    // return 'Hello World!';
  }
}
