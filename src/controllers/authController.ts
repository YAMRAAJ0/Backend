// import { Request, Response } from 'express';
// import User, { IUser } from '../models/User';
// import { generateToken } from '../utils/generateToken';

// // Correctly typed function
// export const getauth_data = async (req: Request, res: Response) => {
//     const { email, password } = req.body;

//     try {
//         // Find the user by email
//         const user = await User.findOne({ email }) as IUser;  // Ensure user is of type IUser

//         // If user exists and password matches, generate token
//         if (user && await user.matchPassword(password)) {
//             const token = generateToken(user); // Generate JWT token
//             res.json({ token });
//         } else {
//             res.status(401).json({ message: 'Invalid credentials' });
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error processing request', error });
//     }
// };




// import { Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import { authService } from '../services/authService';

// export const getauth_data = async (req: Request, res: Response) => {
//   try {
//     const { email, password } = req.body;
//     const user = await authService.authenticate(email, password);

//     if (user) {
//       const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
//       res.status(200).json({ accessToken, user });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } catch (error:any) {
//     res.status(500).json({ message: error.message });
//   }
// };



import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authService } from '../services/authService';
import { logger } from '../utils/logger';  // Import the Winston logger

export const getauth_data = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    logger.info(`Authentication attempt for email: ${email}`);  // Log authentication attempt

    const user = await authService.authenticate(email, password);

    if (user) {
      // Log successful authentication
      logger.info(`User authenticated successfully: ${user.email}`);
      
      // Generate JWT token
      const accessToken = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '1h' }
      );
      
      // Respond with the access token and user data
      res.status(200).json({ accessToken, user });
    } else {
      // Log invalid login attempt
      logger.warn(`Invalid login attempt for email: ${email}`);
      
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error: any) {
    // Log error details
    logger.error(`Error during authentication: ${error.message}`);
    
    res.status(500).json({ message: error.message });
  }
};

