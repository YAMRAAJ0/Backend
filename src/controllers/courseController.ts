// // /src/controllers/courseController.ts
// import { Request, Response } from 'express';
// import Course from '../models/course';

// export const getCourses = async (req: Request, res: Response) => {
//   try {
//     const courses = await Course.find();
//     res.json(courses);
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// export const createCourse = async (req: Request, res: Response) => {
//   try {
//     const { title, description, duration } = req.body;
//     const newCourse = new Course({ title, description, duration });
//     await newCourse.save();
//     res.status(201).json(newCourse);
//   } catch (err) {
//     res.status(400).json({ message: 'Bad request' });
//   }
// };

// export const updateCourse = async (req: Request, res: Response) => {
//   try {
//     const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!course) return res.status(404).json({ message: 'Course not found' });
//     res.json(course);
//   } catch (err) {
//     res.status(400).json({ message: 'Bad request' });
//   }
// };

// export const deleteCourse = async (req: Request, res: Response) => {
//   try {
//     const course = await Course.findByIdAndDelete(req.params.id);
//     if (!course) return res.status(404).json({ message: 'Course not found' });
//     res.status(204).send();
//   } catch (err) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
// src/controllers/courseController.ts
import { Request, Response } from 'express';
import Course from '../models/course';
import multer from 'multer';
import path from 'path';

// Set up storage for uploaded images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Append file extension
  }
});

const upload = multer({ storage });

// Fetch all courses
export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new course
export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, duration } = req.body;

    // Check if the image file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required.' });
    }

    const newCourse = new Course({ 
      title, 
      description, 
      duration, 
      image: req.file.path // Save the image path
    });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error(err); // Log the error to the console
    if (err instanceof Error) {
      res.status(400).json({ message: 'Bad request', error: err.message });
    } else {
      res.status(400).json({ message: 'Bad request', error: 'Unknown error' });
    }
  }
};



// Update an existing course
export const updateCourse = async (req: Request, res: Response) => {
  try {
    const updatedData = { ...req.body };
    
    if (req.file) {
      updatedData.image = req.file.path; // Update the image path if a new file was uploaded
    }
    
    const course = await Course.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
};

// Delete a course
export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Export multer upload for use in routes
export { upload }; // Ensure this line is present
