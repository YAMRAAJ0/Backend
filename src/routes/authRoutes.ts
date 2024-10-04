// src/routes/auth.ts

import express from 'express';
import { getauth_data } from '../controllers/authController';

const router = express.Router();

/**
 * @swagger
 * /auth:
 *   post:
 *     summary: Authenticate user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       401:
 *         description: Invalid credentials
 *       400:
 *         description: Bad request
 */
router.post('/', getauth_data);  // Authenticate user

export default router;



// import express from 'express';
// import { getauth_data } from '../controllers/authController';

// const router = express.Router();

// router.post('/', getauth_data);

// export default router;
