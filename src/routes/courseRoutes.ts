// src/routes/courseRoutes.ts
import { Router } from 'express';
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  upload
} from '../controllers/courseController';

const router = Router();

// Route to get all courses
router.get('/', getCourses);

// Route to create a new course with image upload
router.post('/', upload.single('image'), createCourse);

// Route to update a course with image upload (optional)
router.put('/:id', upload.single('image'), updateCourse);

// Route to delete a course
router.delete('/:id', deleteCourse);

export default router;


