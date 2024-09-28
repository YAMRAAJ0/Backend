import { Request, Response } from 'express';
import User from '../models/User';

export const getuser_data = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
