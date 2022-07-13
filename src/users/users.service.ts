import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto, EditUserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(): Promise<User> {
    try {
      const user = await this.prismaService.user.findFirst({
        where: {
          id: 1,
        },
      });

      delete user.password, delete user.createdAt, delete user.updatedAt;
      return user;
    } catch (e) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }

  async register(dto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(dto.password, salt);
    try {
      const user = await this.prismaService.user.create({
        data: { ...dto, password: passwordHash },
      });

      delete user.password, delete user.createdAt, delete user.updatedAt;

      return user;
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }
    }
  }

  async updateProfile(dto: EditUserDto): Promise<User> {
    try {
      const user = await this.prismaService.user.update({
        where: { id: 1 },
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
