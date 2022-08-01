import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AtStrategy, RefreshTokenStrategy } from './strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AtStrategy, RefreshTokenStrategy],
  imports: [JwtModule.register({})],
})
export class AuthModule {}
