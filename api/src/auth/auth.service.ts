import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { LoginDto } from './dto/login.dto';
import {
  ValidatedUser,
  ValidatedUserResponse,
} from './interfaces/validated-user.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RegisterDto } from './dto/resister.dto';
import { UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    user: UserDocument,
    password: string,
  ): Promise<ValidatedUser | null> {
    const isSamePassword = await bcrypt.compare(password, user.password);

    if (isSamePassword) {
      const result: ValidatedUser = {
        _id: user._id,
        name: user.name,
        email: user.email,
      };

      return result;
    }
    return null;
  }

  async login(loginDto: LoginDto): Promise<ValidatedUserResponse> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const validatedUser = await this.validateUser(user, loginDto.password);

    if (!validatedUser) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = {
      username: user.email,
      sub: user._id.toString(),
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    };
  }

  async register(registerDto: RegisterDto): Promise<ValidatedUserResponse> {
    const user = await this.usersService.findByEmail(registerDto.email);

    if (user) {
      throw new UnauthorizedException('User already exists');
    }

    const createUser = new CreateUserDto();
    createUser.name = registerDto.name;
    createUser.email = registerDto.email;
    createUser.password = registerDto.password;

    const new_user = await this.usersService.create(createUser);

    const payload: JwtPayload = {
      username: new_user.email,
      sub: new_user._id.toString(),
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id: new_user._id,
        name: new_user.name,
        email: new_user.email,
        avatar: new_user.avatar,
      },
    };
  }
}
