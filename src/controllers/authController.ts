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

