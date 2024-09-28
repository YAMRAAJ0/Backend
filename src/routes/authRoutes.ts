import express from 'express';
import { getauth_data } from '../controllers/authController';

const router = express.Router();

router.post('/', getauth_data);

export default router;





// import { Router } from 'express';
// import { login, refreshToken } from '../controllers/authController'; // Assuming these are already defined

// const router = Router();

// // POST route for login
// router.post('/login', login);

// // POST route for refreshing JWT tokens
// router.post('/refresh-token', refreshToken);

// export default router;


// import { Router } from 'express';
// import { login, refreshToken } from '../controllers/authController';

// const router = Router();

// router.post('/login', login);
// router.post('/refresh-token', refreshToken);

// export default router;
