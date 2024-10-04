

import { Request, Response } from 'express';
import User from '../models/registerUser';  // Assuming this is the User model
import bcrypt from 'bcrypt';
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body; // Now expecting 'name' from the frontend

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword  });
    await user.save();

    // Generate a token (assuming you have a token generation logic)
    const token = '...'; // replace with real JWT token generation logic

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



