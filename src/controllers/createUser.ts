import { Request, Response } from 'express';
import User from '../models/registerUser';  // Assuming this is the User model
import bcrypt from 'bcrypt';
import { logger } from '../utils/logger';  // Import Winston logger

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    // Validate request body
    if (!name || !email || !password) {
      logger.warn(`Registration failed: missing fields - name: ${name}, email: ${email}`); // Log missing field warning
      return res.status(400).json({ message: 'Please provide name, email, and password.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    
    // Log successful registration
    logger.info(`New user registered successfully: ${email}`);

    // Generate a token (replace with real JWT token generation logic)
    const token = '...'; // Implement JWT token logic here and log it
    logger.info(`JWT token generated for user: ${email}`);

    // Send response
    res.status(201).json({ user, token });
  } catch (error: any) {
    // Log the error message
    logger.error(`Registration error: ${error.message}`);
    
    // Send error response
    res.status(500).json({ message: 'Server error' });
  }
};
