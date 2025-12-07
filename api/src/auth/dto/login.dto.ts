import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'test@example.com', description: 'User email' })
  @IsNotEmpty({ message: '`email` is required' })
  @IsEmail({}, { message: '`email` must be a valid email' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'User password' })
  @IsNotEmpty({ message: '`password` is required' })
  @MinLength(6, { message: '`password` must be at least 6 characters`' })
  password: string;
}

export class LoginDtoResponse {
  @ApiProperty({ example: 'jwt.token.here', description: 'Access token' })
  access_token: string;

  @ApiProperty({
    example: {
      _id: 'user-id',
      name: 'Test User',
      email: 'test@example.com',
    },
    description: 'User data',
  })
  user: {
    _id: string;
    name: string;
    email: string;
  };
}
