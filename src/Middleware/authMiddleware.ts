import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger } from '../utils/logger'; // Adjust the path as necessary

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    // Log the receipt of the token
    logger.info('Authorization header received', { token });
  
    if (!token) {
      logger.warn('No token provided'); // Log a warning when no token is provided
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET ?? 'secret');
      req.user = decoded;
      logger.info('Token verified successfully', { user: req.user }); // Log successful token verification
      next();
    } catch (error:any) {
      logger.error('Token verification failed', { error: error.message }); // Log the error message
      res.status(401).json({ message: 'Invalid token' });
    }
  };
  
