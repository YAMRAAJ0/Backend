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
// import passport from 'passport';

// export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
//   passport.authenticate('jwt', { session: false }, (err: any, user: Express.User | undefined) => {
//     if (err || !user) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     req.user = user;
//     next();
//   })(req, res, next);
// };
