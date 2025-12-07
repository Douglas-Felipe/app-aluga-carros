import { IsNotEmpty } from 'class-validator';
import { LoginDto } from './login.dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto extends LoginDto {
  @ApiProperty({ example: 'John Doe', description: 'User name' })
  @IsNotEmpty({ message: '`name` is required' })
  name: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: 'User avatar',
  })
  avatar?: string;
}
