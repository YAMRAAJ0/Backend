// ../routes/user.ts (or ../routes/exampleRoutes.ts)
import { Router } from 'express';
import { getuser_data, getCourse, getcertificates, getauth_data } from '../controllers/exampleController';

const router = Router();

// Define routes
router.get('/auth', getauth_data);  // Authentication endpoint
router.get('/users', getuser_data); // User data endpoint
router.get('/courses', getCourse);  // Course data endpoint
router.get('/certificates', getcertificates); // Certificates endpoint

export default router;
