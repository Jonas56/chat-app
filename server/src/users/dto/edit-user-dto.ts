import { IsEmail, IsString } from 'class-validator';

export class EditUserDto {
  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  username: string;
}
