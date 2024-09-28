import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { authService } from '../services/authService';

export const getauth_data = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await authService.authenticate(email, password);

    if (user) {
      const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
      res.status(200).json({ accessToken, user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error:any) {
    res.status(500).json({ message: error.message });
  }
};




// import { Request, Response } from 'express';
// import passport from 'passport';
// import jwt from 'jsonwebtoken';
// import { generateToken, generateRefreshToken } from '../utils/generateToken';
// import { IUser } from '../models/user1';

// export const login = (req: Request, res: Response) => {
//     passport.authenticate('local', { session: false }, (err: any, user: IUser, info: { message: any; }) => {
//       if (err || !user) {
//         return res.status(400).json({ message: info ? info.message : 'Login failed' });
//       }
  
//       req.login(user, { session: false }, (err) => {
//         if (err) {
//           return res.status(400).json({ message: 'Login failed' });
//         }
  
//         // Generate JWT
//         const token = generateToken(user._id);  // user is explicitly typed as IUser
//         const refreshToken = generateRefreshToken(user._id);
  
//         return res.json({ token, refreshToken });
//       });
//     })(req, res);
//   };
// export const refreshToken = (req: Request, res: Response) => {
//   const { refreshToken } = req.body;
//   if (!refreshToken) return res.status(403).json({ message: 'Refresh token required' });

//   jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!, (err: any, user: any) => {
//     if (err) return res.status(403).json({ message: 'Invalid refresh token' });

//     const newToken = generateToken(user.id);
//     res.json({ token: newToken });
//   });
// };
