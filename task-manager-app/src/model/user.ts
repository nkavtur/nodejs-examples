import {model, Schema} from 'mongoose';
import validator from 'validator';

export interface IUser {
  name: string;
  email: string;
  password: string;
  age: number;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: (email: string) => {
      if (!validator.isEmail(email)) {
        throw new Error('Email is invalid!');
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate: (password: string) => {
      if (password.toLowerCase().includes('password')) {
        throw new Error('Password is not valid!');
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate: (age: number) => {
      if (age < 0) {
        throw new Error('Age must be positive number!');
      }
    }
  }
});


export const User = model<IUser>('User', userSchema);
