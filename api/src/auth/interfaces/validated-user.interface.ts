import { Types } from 'mongoose';

export interface ValidatedUser {
  _id: Types.ObjectId | string;
  email: string;
  name: string;
}

export interface ValidatedUserResponse {
  access_token: string;
  user: ValidatedUser;
}
