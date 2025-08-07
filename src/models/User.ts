import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document { 
  email: string;
  password: string;
  name?: string;
  role: string;
}

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
});

export default mongoose.model<IUser>('User', userSchema);


