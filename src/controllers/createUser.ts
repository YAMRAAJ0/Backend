// import { Request, Response } from 'express';
// import User from '../models/User';
// import bcrypt from 'bcrypt'; // Import bcrypt for password hashing
// import { body, validationResult } from 'express-validator'; // For validating the request

// // Create a new user (Registration)
// export const registerUser = [
//   // Validate user input
//   body('email').isEmail().withMessage('Please provide a valid email'),
//   body('password')
//     .isLength({ min: 6 })
//     .withMessage('Password must be at least 6 characters long'),

//   // The main logic after validation
//   async (req: Request, res: Response) => {
//     const errors = validationResult(req);

//     // Check for validation errors
//     if (!errors.isEmpty()) {
//       return res.status(400).json({ errors: errors.array() });
//     }

//     const { email, password } = req.body; // Assume email and password are sent in the body

//     try {
//       // Check if user already exists
//       const existingUser = await User.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({ message: 'User already exists' });
//       }

//       // Hash the password before saving
//       const hashedPassword = await bcrypt.hash(password, 10); // Hash with a salt rounds of 10

//       // Create a new user
//       const newUser = new User({ email, password: hashedPassword });
//       await newUser.save();

//       res.status(201).json({
//         message: 'User registered successfully',
//         user: { id: newUser._id, email: newUser.email },
//       }); // Return some user details
//     } catch (err) {
//       console.error(err);
//       res.status(500).json({ message: 'Server error' });
//     }
//   },
// ];

// src/controllers/createUser.ts

import { Request, Response } from 'express';
import User from '../models/registerUser';  // Assuming this is the User model

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body; // Now expecting 'name' from the frontend

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide name, email, and password.' });
    }

    const user = new User({ name, email, password });
    await user.save();

    // Generate a token (assuming you have a token generation logic)
    const token = '...'; // replace with real JWT token generation logic

    res.status(201).json({ user, token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



