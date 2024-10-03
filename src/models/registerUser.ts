import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Check if the model already exists to prevent OverwriteModelError
const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default User;
