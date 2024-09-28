import express from 'express';
import { getuser_data } from '../controllers/userController';

const router = express.Router();

router.get('/', getuser_data);

export default router;






// import { Router } from 'express';
// import { getUsers } from '../controllers/userController';
// import { isAuthenticated } from '../Middleware/authMiddleware';

// const router = Router();

// router.get('/', isAuthenticated, getUsers);

// export default router;
