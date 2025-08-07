// src/routes/registerUser.ts

import express from 'express';
import { register } from '../controllers/authController';
const router = express.Router();

router.post('/', register);  // POST /auth/register

export default router;

