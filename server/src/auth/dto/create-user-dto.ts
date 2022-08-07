import {
  IsEmail,
  IsNotEmpty,
  Matches,
  ValidationArguments,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'name should not be empty' })
  name: string;

  @IsEmail({}, { message: 'email is not valid' })
  email: string;

  @IsNotEmpty()
  username: string;

  @Matches(
    '^(?=.*?[A-Z])(?=(.*[a-z])+)(?=(.*[\\d])+)(?=(.*[\\W])+)(?!.*\\s).{8,}$',
    '',
    {
      message:
        'Password must contain minimum eight characters. \n At least: one uppercase letter. \n One lowercase letter. \n One number and one special character',
    },
  )
  password: string;

  @IsNotEmpty()
  avatar: string;
}
