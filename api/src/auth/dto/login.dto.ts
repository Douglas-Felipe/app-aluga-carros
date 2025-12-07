import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: '`email` is required' })
  @IsEmail({}, { message: '`email` must be a valid email' })
  email: string;

  @IsNotEmpty({ message: '`password` is required' })
  @MinLength(6, { message: '`password` must be at least 6 characters`' })
  password: string;
}
