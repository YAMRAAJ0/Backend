// // src/routes/auth.ts

// import express from 'express';
// import jwt from 'jsonwebtoken';
// import User from '../models/User';
// import dotenv from 'dotenv';
// import { generateToken, generateRefreshToken } from '../utils/generateToken';

// dotenv.config();
// const router = express.Router();

// /**
//  * @swagger
//  * /auth/register:
//  *   post:
//  *     summary: Register a new user
//  *     tags: [Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 format: email
//  *               password:
//  *                 type: string
//  *             required:
//  *               - email
//  *               - password
//  *     responses:
//  *       201:
//  *         description: User registered successfully
//  *       400:
//  *         description: Error registering user
//  */
// router.post('/register', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = new User({ email, password });
//     await user.save();
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     res.status(400).json({ message: 'Error registering user', error: err });
//   }
// });

// /**
//  * @swagger
//  * /auth/login:
//  *   post:
//  *     summary: Login a user
//  *     tags: [Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               email:
//  *                 type: string
//  *                 format: email
//  *               password:
//  *                 type: string
//  *             required:
//  *               - email
//  *               - password
//  *     responses:
//  *       200:
//  *         description: User logged in successfully
//  *       401:
//  *         description: Invalid credentials
//  */
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (user && (await user.matchPassword(password))) {
//       const accessToken = generateToken(user);
//       const refreshToken = generateRefreshToken(user);
//       res.json({ accessToken, refreshToken });
//     } else {
//       res.status(401).json({ message: 'Invalid credentials' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: 'Error logging in', error: err });
//   }
// });

// /**
//  * @swagger
//  * /auth/token:
//  *   post:
//  *     summary: Refresh access token
//  *     tags: [Auth]
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *               refreshToken:
//  *                 type: string
//  *             required:
//  *               - refreshToken
//  *     responses:
//  *       200:
//  *         description: New access token
//  *       401:
//  *         description: Refresh Token Required
//  *       403:
//  *         description: Invalid Refresh Token
//  */
// router.post('/token', (req, res) => {
//     const { refreshToken } = req.body;
//     if (!refreshToken) {
//         return res.status(401).json({ message: 'Refresh Token Required' });
//     }
    
//     const refreshSecret = process.env.REFRESH_SECRET;
//     if (!refreshSecret) {
//         return res.status(500).json({ message: 'REFRESH_SECRET is not defined' });
//     }

//     jwt.verify(refreshToken, refreshSecret, (err: any, user: any) => {
//         if (err) return res.status(403).json({ message: 'Invalid Refresh Token' });
//         const newAccessToken = generateToken(user);
//         res.json({ accessToken: newAccessToken });
//     });
// });

// export default router;



// // import express from 'express';
// // import jwt from 'jsonwebtoken';
// // import User from '../models/User';
// // import dotenv from 'dotenv';
// // import { generateToken, generateRefreshToken } from '../utils/generateToken';
// // dotenv.config();

// // const router = express.Router();


// // // Register route
// // router.post('/register', async (req, res) => {
// //   const { email, password } = req.body;
// //   try {
// //     const user = new User({ email, password });
// //     await user.save();
// //     res.status(201).json({ message: 'User registered successfully' });
// //   } catch (err) {
// //     res.status(400).json({ message: 'Error registering user', error: err });
// //   }
// // });

// // // Login route
// // router.post('/login', async (req, res) => {
// //   const { email, password } = req.body;
// //   try {
// //     const user = await User.findOne({ email });
// //     if (user && (await user.matchPassword(password))) {
// //       const accessToken = generateToken(user);
// //       const refreshToken = generateRefreshToken(user);
// //       res.json({ accessToken, refreshToken });
// //     } else {
// //       res.status(401).json({ message: 'Invalid credentials' });
// //     }
// //   } catch (err) {
// //     res.status(500).json({ message: 'Error logging in', error: err });
// //   }
// // });

// // // Refresh token route
// // router.post('/token', (req, res) => {
// //     const { refreshToken } = req.body;
// //     if (!refreshToken) {
// //         return res.status(401).json({ message: 'Refresh Token Required' });
// //     }
    
// //     const refreshSecret = process.env.REFRESH_SECRET;
// //     if (!refreshSecret) {
// //         return res.status(500).json({ message: 'REFRESH_SECRET is not defined' });
// //     }

// //     jwt.verify(refreshToken, refreshSecret, (err:any, user:any) => {
// //         if (err) return res.status(403).json({ message: 'Invalid Refresh Token' });
// //         const newAccessToken = generateToken(user);
// //         res.json({ accessToken: newAccessToken });
// //     });
// // });


// // export default router;

