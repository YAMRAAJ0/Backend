import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import CourseModel from '../models/course'; // Adjust the import path according to your directory structure
import { logError, logger } from '../utils/logger';  // Import Winston logger

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory to store uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Appends timestamp to the filename
    }
});

export const upload = multer({ storage: storage }); // Export the upload variable

// Get all courses
export const getCourses = async (req: Request, res: Response): Promise<Response> => {
    try {
        const courses = await CourseModel.find();
        logger.info('Fetched all courses'); // Log successful fetch
        return res.json(courses); // Return the response
    } catch (error: any) {
        logError(error.message);
        logger.error(`Error fetching courses: ${error.message}`); // Log error
        return res.status(500).json({ message: "Failed to fetch courses." }); // Return the response
    }
};

// Create a new course
export const createCourse = async (req: Request, res: Response): Promise<Response> => {
    const { title, description, duration } = req.body;
    const image = req.file ? req.file.filename : null; // Get the uploaded image filename

    try {
        const newCourse = new CourseModel({ title, description, duration, image });
        await newCourse.save();
        
        logger.info(`New course created: ${title}`); // Log successful creation
        if (image) {
            logger.info(`Image uploaded for course ${title}: ${image}`); // Log image upload
        }
        return res.status(201).json(newCourse); // Return the response
    } catch (error: any) {
        logError(error.message);
        logger.error(`Error creating course: ${error.message}`); // Log error
        return res.status(500).json({ message: "Failed to create course." }); // Return the response
    }
};

// Update an existing course
export const updateCourse = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { title, description, duration } = req.body;
    const image = req.file ? req.file.filename : null; // Optional image

    try {
        const updatedCourse = await CourseModel.findByIdAndUpdate(
            id,
            {
                title,
                description,
                duration,
                image // If image is null, it won't update
            },
            { new: true }
        );
        if (!updatedCourse) {
            logger.warn(`Course not found with ID: ${id}`); // Log warning if course not found
            return res.status(404).json({ message: "Course not found." });
        }

        logger.info(`Course updated: ${updatedCourse.title}`); // Log successful update
        if (image) {
            logger.info(`Image updated for course ${updatedCourse.title}: ${image}`); // Log image update
        }
        return res.json(updatedCourse); // Return the response
    } catch (error: any) {
        logError(error.message);
        logger.error(`Error updating course: ${error.message}`); // Log error
        return res.status(500).json({ message: "Failed to update course." }); // Return the response
    }
};

// Delete a course
export const deleteCourse = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const deletedCourse = await CourseModel.findByIdAndDelete(id);
        if (!deletedCourse) {
            logger.warn(`Course not found with ID: ${id}`); // Log warning if course not found
            return res.status(404).json({ message: "Course not found." });
        }

        logger.info(`Course deleted: ${deletedCourse.title}`); // Log successful deletion
        return res.status(204).send(); // No content
    } catch (error: any) {
        logError(error.message);
        logger.error(`Error deleting course: ${error.message}`); // Log error
        return res.status(500).json({ message: "Failed to delete course." }); // Return the response
    }
};
