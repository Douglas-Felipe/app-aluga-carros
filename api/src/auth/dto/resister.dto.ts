import { IsNotEmpty } from 'class-validator';
import { LoginDto } from './login.dto';

export class RegisterDto extends LoginDto {
  @IsNotEmpty({ message: '`name` is required' })
  name: string;
}
