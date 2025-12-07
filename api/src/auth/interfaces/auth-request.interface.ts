import { Request } from 'express';
import { RequestUser } from './jwt-strategy.interface';

export interface AuthRequest extends Request {
  user: RequestUser;
}
