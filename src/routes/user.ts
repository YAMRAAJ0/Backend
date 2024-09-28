// ./routes/user.ts
import express from 'express';

const router = express.Router();

// Example route for fetching user details
router.get('/users', (_req, res) => {
  res.json({ message: 'User list' });
});

import { Router } from 'express';
import { getuser_data, getCourse, getcertificates, getauth_data } from '../controllers/exampleController';



// Define routes
router.get('/auth', getauth_data);  // Authentication endpoint
router.get('/users', getuser_data); // User data endpoint
router.get('/courses', getCourse);  // Course data endpoint
router.get('/certificates', getcertificates); // Certificates endpoint

export default router;


