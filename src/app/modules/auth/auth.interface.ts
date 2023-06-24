import { Model } from 'mongoose';

export type ILoginUser = {
  id: string;
  password: string;
};

export type ILoginUserResponse = {
  accessToken: string;
  refreshToken?: string;
  needsPasswordChange: boolean;
};

export type LoginUserModel = Model<ILoginUser, Record<string, unknown>>;
