// ./routes/user.ts
import express from 'express';

const router = express.Router();

// Example route for fetching user details
router.get('/users', (_req, res) => {
  res.json({ message: 'User list' });
});

export default router;
