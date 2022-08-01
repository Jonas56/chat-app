import { Body, Controller, Get, Put } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetCurrentUserId } from 'src/common/decorators';
import { EditUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('api')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('user/me')
  findOne(@GetCurrentUserId() userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }

  @Put('users')
  update(@Body() dto: EditUserDto, @GetCurrentUserId() userId: number) {
    return this.userService.updateProfile(dto, userId);
  }
}
