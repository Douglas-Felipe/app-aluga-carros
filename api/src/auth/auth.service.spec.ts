import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from 'src/users/schemas/user.schema';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('AuthService', () => {
  let service: AuthService;
  let usersService: UsersService;
  let jwtService: JwtService;

  const userDocument = {
    _id: 'user-id',
    name: 'Test User',
    email: 'test@example.com',
    password: 'hashedPassword',
  } as unknown as UserDocument;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findByEmail: jest.fn(),
            create: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('validateUser', () => {
    it('should return user when password is valid', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      const result = await service.validateUser(userDocument, 'password');
      expect(result).toEqual({
        _id: 'user-id',
        name: 'Test User',
        email: 'test@example.com',
      });
    });

    it('should return null when password is invalid', async () => {
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      const result = await service.validateUser(userDocument, 'wrongpassword');
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return access token and user when login is successful', async () => {
      const loginDto = { email: 'test@example.com', password: 'password' };
      (usersService.findByEmail as jest.Mock).mockResolvedValue(userDocument);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwtService.sign as jest.Mock).mockReturnValue('test-token');

      const result = await service.login(loginDto);

      expect(result).toEqual({
        access_token: 'test-token',
        user: {
          _id: 'user-id',
          name: 'Test User',
          email: 'test@example.com',
        },
      });
    });

    it('should throw UnauthorizedException when user not found', async () => {
      const loginDto = { email: 'test@example.com', password: 'password' };
      (usersService.findByEmail as jest.Mock).mockResolvedValue(null);

      await expect(service.login(loginDto)).rejects.toThrow(
        'Invalid credentials',
      );
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      const loginDto = { email: 'test@example.com', password: 'wrongpassword' };
      (usersService.findByEmail as jest.Mock).mockResolvedValue(userDocument);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login(loginDto)).rejects.toThrow(
        'Invalid credentials',
      );
    });
  });

  describe('register', () => {
    it('should create a new user and return access token and user', async () => {
      const registerDto = {
        name: 'New User',
        email: 'new@example.com',
        password: 'password',
      };
      const newUser = {
        _id: 'new-user-id',
        name: 'New User',
        email: 'new@example.com',
      };

      (usersService.findByEmail as jest.Mock).mockResolvedValue(null);
      (usersService.create as jest.Mock).mockResolvedValue(newUser);
      (jwtService.sign as jest.Mock).mockReturnValue('new-test-token');

      const result = await service.register(registerDto);

      expect(result).toEqual({
        access_token: 'new-test-token',
        user: {
          _id: 'new-user-id',
          name: 'New User',
          email: 'new@example.com',
        },
      });
    });

    it('should throw UnauthorizedException when user already exists', async () => {
      const registerDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password',
      };
      (usersService.findByEmail as jest.Mock).mockResolvedValue(userDocument);

      await expect(service.register(registerDto)).rejects.toThrow(
        'User already exists',
      );
    });
  });
});
