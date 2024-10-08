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





// import bcrypt from 'bcryptjs';
// import User from '../models/User';

// export const authService = {
//   authenticate: async (email: string, password: string) => {
//     const user = await User.findOne({ email });
//     if (user && bcrypt.compareSync(password, user.password)) {
//       return user;
//     }
//     return null;
//   }
// };


import User, { IUser } from '../models/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const registerUser = async (name: string, email: string, password: string, role: string) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role });
    await newUser.save();
    return newUser;
};

export const loginUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    return { token, user };
};
