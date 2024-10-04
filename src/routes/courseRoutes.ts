import { Router } from 'express';
import {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  upload
} from '../controllers/courseController';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - title
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The course ID
 *         title:
 *           type: string
 *           description: The title of the course
 *         description:
 *           type: string
 *           description: A brief description of the course
 *         image:
 *           type: string
 *           format: binary
 *           description: The course image
 *       example:
 *         id: "60d0fe4f5311236168a109ca"
 *         title: "Introduction to Programming"
 *         description: "Learn the basics of programming using Python."
 *         image: "base64_image_data"
 */

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
router.get('/', getCourses);

/**
 * @swagger
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       201:
 *         description: Course created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 */
router.post('/', upload.single('image'), createCourse);

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The course ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Course not found
 */
router.put('/:id', upload.single('image'), updateCourse);

/**
 * @swagger
 * /courses/{id}:
 *   delete:
 *     summary: Delete a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The course ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 */
router.delete('/:id', deleteCourse);

export default router;





// // src/routes/courseRoutes.ts
// import { Router } from 'express';
// import {
//   getCourses,
//   createCourse,
//   updateCourse,
//   deleteCourse,
//   upload
// } from '../controllers/courseController';

// const router = Router();

// // Route to get all courses
// router.get('/', getCourses);

// // Route to create a new course with image upload
// router.post('/', upload.single('image'), createCourse);

// // Route to update a course with image upload (optional)
// router.put('/:id', upload.single('image'), updateCourse);

// // Route to delete a course
// router.delete('/:id', deleteCourse);

// export default router;


