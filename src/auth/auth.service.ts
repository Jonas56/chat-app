import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, CreateUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: CreateUserDto): Promise<Tokens> {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(dto.password, salt);

    try {
      const user = await this.prismaService.user.create({
        data: {
          ...dto,
          password: passwordHash,
          hashRtoken: undefined,
        },
      });
      const tokens = await this.issueTokens(user.id, user.email);

      this.updateHashRefreshToken(user.id, tokens.refreshToken);

      return tokens;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async updateHashRefreshToken(userId: number, refreshToken: string) {
    const salt = await bcrypt.genSalt();
    const hashRtoken = await bcrypt.hash(refreshToken, salt);
    await this.prismaService.user.update({
      where: { id: userId },
      data: { hashRtoken },
    });
  }

  async signin(authDto: AuthDto): Promise<Tokens> {
    const user = await this.prismaService.user.findUnique({
      where: { email: authDto.email },
    });
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }
    const passwordValid = await bcrypt.compare(authDto.password, user.password);
    if (!passwordValid) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.issueTokens(user.id, user.email);
    await this.updateHashRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async logout(userId: number) {
    await this.prismaService.user.updateMany({
      where: { id: userId, hashRtoken: { not: null } },
      data: { hashRtoken: null },
    });
    return;
  }

  async refreshToken(userId: number, refreshToken: string): Promise<Tokens> {
    const user = await this.prismaService.user.findFirst({
      where: { id: userId },
    });
    if (!user) {
      throw new ForbiddenException('Access Denied');
    }
    const hashRtoken = user.hashRtoken;
    if (!hashRtoken) {
      throw new ForbiddenException('Access Denied');
    }
    const rtMatches = await bcrypt.compare(refreshToken, hashRtoken);
    if (!rtMatches) {
      throw new ForbiddenException('Access Denied');
    }
    const tokens = await this.issueTokens(user.id, user.email);
    await this.updateHashRefreshToken(user.id, tokens.refreshToken);
    return tokens;
  }

  async issueTokens(userId: number, email: string) {
    const [accessToken, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.AT_SECRET,
          expiresIn: 60 * 60,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: process.env.REFRESH_TOKEN_SECRET,
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
