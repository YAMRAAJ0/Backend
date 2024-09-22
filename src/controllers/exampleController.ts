import { Request, Response } from 'express';
import { userCollection, dataCollection, certificatesCollection, authCollection } from '../config/database';

export const getauth_data = async (req: Request, res: Response) => {
  try {
    const users = await authCollection?.find({}).toArray() || [];
    res.json(users);
  } catch (error) {
    console.error("Error fetching auth data:", error);
    res.status(500).json({ error: "Error fetching auth data" });
  }
};

export const getuser_data = async (req: Request, res: Response) => {
  try {
    const users = await userCollection?.find({}).toArray() || [];
    res.json(users);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Error fetching user data" });
  }
};

export const getCourse = async (req: Request, res: Response) => {
  try {
    const courses = await dataCollection?.find({}).toArray() || [];
    res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Error fetching courses" });
  }
};

export const getcertificates = async (req: Request, res: Response) => {
  try {
    const certificates = await certificatesCollection?.find({}).toArray() || [];
    res.json(certificates);
  } catch (error) {
    console.error("Error fetching certificates:", error);
    res.status(500).json({ error: "Error fetching certificates" });
  }
};
