import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { LoginDto, LoginDtoResponse } from './dto/login.dto';
import { RegisterDto } from './dto/resister.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: LoginDtoResponse,
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: LoginDtoResponse,
  })
  @ApiResponse({ status: 401, description: 'User already exists' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
