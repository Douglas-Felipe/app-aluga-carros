import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

import { JwtAuthGuard } from './jwt-auth.guard';

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let reflector: Reflector;

  const mockExecutionContext = {
    getClass: jest.fn(),
    getHandler: jest.fn(),
  } as unknown as ExecutionContext;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtAuthGuard,
        {
          provide: Reflector,
          useValue: {
            getAllAndOverride: jest.fn(),
          },
        },
      ],
    }).compile();

    guard = module.get<JwtAuthGuard>(JwtAuthGuard);
    reflector = module.get<Reflector>(Reflector);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  describe('canActivate', () => {
    it('should return true for a public route', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
      expect(guard.canActivate(mockExecutionContext)).toBe(true);
    });

    it('should return true for an authenticated user on a protected route', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
      const canActivate = jest.spyOn(AuthGuard('jwt').prototype, 'canActivate');
      canActivate.mockReturnValue(true);
      expect(guard.canActivate(mockExecutionContext)).toBe(true);
      canActivate.mockRestore();
    });

    it('should return false for an unauthenticated user on a protected route', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
      const canActivate = jest.spyOn(AuthGuard('jwt').prototype, 'canActivate');
      canActivate.mockReturnValue(false);
      expect(guard.canActivate(mockExecutionContext)).toBe(false);
      canActivate.mockRestore();
    });

    it('should return what super returns for a protected route', () => {
      jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);

      const result = new Observable<boolean>();
      jest
        .spyOn(AuthGuard('jwt').prototype, 'canActivate')
        .mockReturnValue(result);

      expect(guard.canActivate(mockExecutionContext)).toBe(result);
    });
  });
});
