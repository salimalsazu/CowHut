import { Schema, model } from 'mongoose';
import { role } from './user.constant';
import { IUser, UserModel } from './user.interface';

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: role,
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: true,
        },
        lastName: {
          type: String,
          required: true,
        },
      },
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
      required: true,
    },
    income: { type: Number, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const User = model<IUser, UserModel>('User', userSchema);
