import express from 'express';
import { getCourses } from '../controllers/courseController';

const router = express.Router();

router.get('/', getCourses);

export default router;




// // /src/routes/courseRoutes.ts
// import { Router } from 'express';
// import { getCourses, createCourse, updateCourse, deleteCourse } from '../controllers/courseController';
// import { isAuthenticated } from '../middlewares/authMiddleware';

// const router = Router();

// router.get('/', isAuthenticated, getCourses);
// router.post('/', isAuthenticated, createCourse);
// router.put('/:id', isAuthenticated, updateCourse);
// router.delete('/:id', isAuthenticated, deleteCourse);

// export default router;
