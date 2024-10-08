// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// const jwtSecret = process.env.JWT_SECRET;

// const jwtAuth = (req: { headers: { authorization?: string }; user?: any }, res: any, next: () => void) => {
//     const token = req.headers.authorization?.split(' ')[1]; // Expecting Bearer token
//     if (!token) {
//       return res.status(401).send('Token is missing');
//     }

//     if (!jwtSecret) {
//       return res.status(500).send('JWT_SECRET is not defined');
//     }
  
//     jwt.verify(token, jwtSecret, (err: any, user: any) => {
//       if (err) {
//         return res.status(403).send('Invalid or expired token');
//       }
//       req.user = user;
//       next();
//     });
// };
