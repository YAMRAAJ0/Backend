import { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import CourseModel from '../models/course'; // Adjust the import path according to your directory structure

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
        return res.json(courses); // Return the response
    } catch (error) {
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
        return res.status(201).json(newCourse); // Return the response
    } catch (error) {
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
            return res.status(404).json({ message: "Course not found." });
        }
        return res.json(updatedCourse); // Return the response
    } catch (error) {
        return res.status(500).json({ message: "Failed to update course." }); // Return the response
    }
};

// Delete a course
export const deleteCourse = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        const deletedCourse = await CourseModel.findByIdAndDelete(id);
        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found." });
        }
        return res.status(204).send(); // No content
    } catch (error) {
        return res.status(500).json({ message: "Failed to delete course." }); // Return the response
    }
};
