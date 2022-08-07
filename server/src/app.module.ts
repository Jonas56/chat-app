import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AtGuard } from './common/guards';
import { APP_GUARD } from '@nestjs/core';
import { AppGateway } from './app.gateway';
import { ChatModule } from './chat/chat.module';

@Module({
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    AppGateway,
  ],
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ChatModule,
  ],
})
export class AppModule {}
