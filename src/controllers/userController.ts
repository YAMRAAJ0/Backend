// import { Request, Response } from 'express';
// import User from '../models/User';

// export const getuser_data = async (req: Request, res: Response) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };


// import { Request, Response } from 'express';
// import User from '../models/User';

// // Get all users
// export const getuser_data = async (req: Request, res: Response) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Update user by ID
// export const updateUser = async (req: Request, res: Response) => {
//   const userId = req.params.id;
//   const { email, password } = req.body; // Assume email and password are sent in the body

//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       { email, password }, // Update fields
//       { new: true, runValidators: true } // Options: return the updated document and run validators
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json(updatedUser);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Delete user by ID
// export const deleteUser = async (req: Request, res: Response) => {
//   const userId = req.params.id;

//   try {
//     const deletedUser = await User.findByIdAndDelete(userId);

//     if (!deletedUser) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     res.json({ message: 'User deleted successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };


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
  const { email, password } = req.body; // Assume email and password are sent in the body

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // Hash with a salt rounds of 10

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json(newUser); // Return the newly created user
  } catch (err) {
    console.error(err);
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
