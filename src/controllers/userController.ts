


// import { Request, Response } from 'express';
// import User from '../models/User';
// import bcrypt from 'bcrypt'; // Import bcrypt for password hashing

// // Get all users
// export const getuser_data = async (req: Request, res: Response) => {
//   try {
//     const users = await User.find();
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Create a new user
// export const createUser = async (req: Request, res: Response) => {
//   const { name, email, password } = req.body; // Now expecting 'name' from the frontend

//   try {
//     if (!name || !email || !password) {
//       return res.status(400).json({ message: 'Please provide name, email, and password.' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({ name, email, password: hashedPassword  });
//     await user.save();

//     // Generate a token (assuming you have a token generation logic)
//     const token = '...'; // replace with real JWT token generation logic

//     res.status(201).json({ user, token });
//   } catch (error) {
//     console.error('Registration error:', error);
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
import { logger } from '../utils/logger';  // Import Winston logger

// Get all users
export const getuser_data = async (req: Request, res: Response) => {
  try {
    const users = await User.find();
    logger.info('Fetched all users');  // Log successful user fetch
    res.json(users);
  } catch (err: any) {
    logger.error(`Error fetching users: ${err.message}`);  // Log error
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new user
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      logger.warn('Missing required fields for user creation');  // Log warning for missing fields
      return res.status(400).json({ message: 'Please provide name, email, and password.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Simulating token generation (replace with actual JWT logic)
    const token = '...'; // replace with real JWT token generation logic

    logger.info(`User created: ${name}`);  // Log successful user creation
    res.status(201).json({ user, token });
  } catch (error: any) {
    logger.error(`Registration error: ${error.message}`);  // Log registration error
    res.status(500).json({ message: 'Server error' });
  }
};

// Update user by ID
export const updateUser = async (req: Request, res: Response) => {
  const userId = req.params.id;
  const { email, password } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email, password }, // Update fields
      { new: true, runValidators: true } // Options: return updated document and run validators
    );

    if (!updatedUser) {
      logger.warn(`User not found: ${userId}`);  // Log warning if user is not found
      return res.status(404).json({ message: 'User not found' });
    }

    logger.info(`User updated: ${updatedUser.name}`);  // Log successful update
    res.json(updatedUser);
  } catch (err: any) {
    logger.error(`Error updating user: ${err.message}`);  // Log update error
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user by ID
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      logger.warn(`User not found: ${userId}`);  // Log warning if user is not found
      return res.status(404).json({ message: 'User not found' });
    }

    logger.info(`User deleted: ${deletedUser.name}`);  // Log successful deletion
    res.json({ message: 'User deleted successfully' });
  } catch (err: any) {
    logger.error(`Error deleting user: ${err.message}`);  // Log deletion error
    res.status(500).json({ message: 'Server error' });
  }
};
