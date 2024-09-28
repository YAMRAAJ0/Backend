// /src/controllers/courseController.ts
import { Request, Response } from 'express';
import Course from '../models/course';

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const { title, description, duration } = req.body;
    const newCourse = new Course({ title, description, duration });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: 'Bad request' });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
