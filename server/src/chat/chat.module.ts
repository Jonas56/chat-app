import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { ChatService } from './chat.service';

@Module({
  controllers: [],
  providers: [ChatService],
  imports: [UsersModule],
})
export class ChatModule {}
