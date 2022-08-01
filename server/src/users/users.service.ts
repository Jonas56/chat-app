import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { EditUserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(userId: number): Promise<User> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          id: userId,
        },
      });

      delete user.password, delete user.createdAt, delete user.updatedAt;
      return user;
    } catch (e) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateProfile(dto: EditUserDto, userId: number): Promise<User> {
    try {
      const user = await this.prismaService.user.update({
        where: { id: userId },
        data: { ...dto },
      });

      delete user.password, delete user.createdAt, delete user.updatedAt;

      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
