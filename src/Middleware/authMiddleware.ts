import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET ?? 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// import { Request, Response, NextFunction } from 'express';
// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// // Extend Request type
// interface CustomRequest extends Request {
//     userId?: string;
//     role?: string;
// }

// export const authMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
//     const token = req.headers['authorization']?.split(' ')[1]; // Bearer token
//     if (!token) return res.status(401).json({ message: 'No token provided' });

//     jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, decoded) => {
//         if (err) return res.status(403).json({ message: 'Invalid token' });

//         if (typeof decoded === 'object') { // Ensure decoded is an object
//             req.userId = decoded.userId;
//             req.role = decoded.role;
//         }

//         next();
//     });
// };

// // Role Middleware
// export const roleMiddleware = (roles: string[]) => {
//     return (req: CustomRequest, res: Response, next: NextFunction) => {
//         if (!req.role || !roles.includes(req.role)) {
//             return res.status(403).json({ message: 'Access denied' });
//         }
//         next();
//     };
// };
