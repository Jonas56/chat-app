import { Body, Controller, Get, Post, Put } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto, EditUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('api')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('user/me')
  findOne(): Promise<User> {
    return this.userService.findOne();
  }

  @Post('/register')
  register(@Body() createUser: CreateUserDto): Promise<User> {
    return this.userService.register(createUser);
  }

  @Put('users')
  update(@Body() dto: EditUserDto) {
    return this.userService.updateProfile(dto);
  }
}
