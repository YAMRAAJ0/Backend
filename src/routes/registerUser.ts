// src/routes/registerUser.ts

import express from 'express';
import { registerUser } from '../controllers/createUser';

const router = express.Router();

router.post('/', registerUser);  // POST /auth/register

export default router;
