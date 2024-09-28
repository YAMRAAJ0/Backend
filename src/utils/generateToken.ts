import jwt from 'jsonwebtoken';

export const generateToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, { expiresIn: '15m' });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: '7d' });
};



// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// export const generateToken = (id: string) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET!, {
//     expiresIn: '30m',
//   });
// };

// export const generateRefreshToken = (id: string) => {
//   return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET!, {
//     expiresIn: '7d',
//   });
// };
