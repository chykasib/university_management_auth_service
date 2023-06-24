import { Schema, model } from 'mongoose';
import { LoginUserModel, ILoginUser } from './auth.interface';

const LoginUserModelSchema = new Schema<ILoginUser, LoginUserModel>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Admin = model<ILoginUser, LoginUserModel>(
  'LoginUser',
  LoginUserModelSchema
);
