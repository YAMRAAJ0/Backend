// // src/services/authService.ts
// // src/services/authService.ts
// import User from '../models/user'; // Ensure this path is correct
// import { IUser } from '../models/user1'; // Adjust the import if needed

// export const authenticate = async (email: string, password: string): Promise<IUser> => {
//     const user = await User.findOne({ email });
//     if (!user) {
//         throw new Error('User not found');
//     }

//     const isMatch = await user.matchPassword(password);
//     if (!isMatch) {
//         throw new Error('Invalid credentials');
//     }

//     return user; // Return the user object if authentication is successful
// };

// // You may also want to export the `authenticate` function like this:
// export default {
//     authenticate,
// };





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
