import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';

@Module({
  controllers: [],
  providers: [],
  imports: [UsersModule, PrismaModule],
})
export class AppModule {}
