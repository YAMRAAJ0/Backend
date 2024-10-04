


import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

// Get all users
export const getuser_data = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
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

// Update user by ID
export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { email, password } = req.body; // Assume email and password are sent in the body

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email, password }, // Update fields
      { new: true, runValidators: true } // Options: return the updated document and run validators
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user by ID
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
