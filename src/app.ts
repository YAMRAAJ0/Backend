import express, { Application } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import courseRoutes from './routes/courseRoutes';
import certificateRoutes from './routes/certificateRoutes';
import register from './routes/registerUser'; 
import cors from 'cors';
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

export default app;



// // /src/app.ts
// import express from 'express';
// import bodyParser from 'body-parser';
// import passport from './config/passport';
// import connectDB from './config/db';
// import authRoutes from './routes/authRoutes';
// import userRoutes from './routes/userRoutes';
// import courseRoutes from './routes/courseRoutes';
// import certificateRoutes from './routes/certificateRoutes';

// const app = express();

// app.use(bodyParser.json());
// app.use(passport.initialize());

// connectDB();

// app.use('/auth', authRoutes);
// app.use('/users', userRoutes);
// app.use('/courses', courseRoutes);
// app.use('/certificates', certificateRoutes);

// app.listen(5000, () => {
//   console.log('Server running on http://localhost:5000');
// });
