import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { ChatGateway } from './chat.gateway';
import { ChatService } from './chat.service';

@Module({
  controllers: [],
  providers: [ChatService, ChatGateway, JwtService],
  imports: [UsersModule],
})
export class ChatModule {}
