import bcrypt from 'bcryptjs';
import User from '../models/User';

export const authService = {
  authenticate: async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
      return user;
    }
    return null;
  }
};
