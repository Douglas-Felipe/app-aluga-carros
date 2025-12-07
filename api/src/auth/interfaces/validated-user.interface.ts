import { Types } from 'mongoose';

export interface ValidatedUser {
  _id: Types.ObjectId | string;
  email: string;
  name: string;
  avatar?: string;
}

export interface ValidatedUserResponse {
  access_token: string;
  user: ValidatedUser;
}
