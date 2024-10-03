import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import courseRoutes from './routes/courseRoutes';
import certificateRoutes from './routes/certificateRoutes';
import register from './routes/registerUser'; 
import cors from 'cors';
import path from 'path';
dotenv.config();

const app: Application = express();
connectDB();
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],  // or use '*' for all origins
  credentials: true,  // if your frontend needs to send cookies or HTTP credentials
}));
app.use(express.json());

// Routes
app.use('/auth', authRoutes); // Handles login
app.use('/auth/register', register); // Handles registration
app.use('/users', userRoutes);
app.use('/courses', courseRoutes);
app.use('/certificates', certificateRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
export default app;



