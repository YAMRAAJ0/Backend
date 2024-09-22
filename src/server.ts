import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';
import cors from 'cors';
import authRoutes from './routes/auth';
import passportConfig from './config/passport';

dotenv.config();
console.log('Mongo URI:', process.env.MONGO_URI); // Log the Mongo URI

const app = express();
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
passportConfig(passport);

// MongoDB connection
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
    throw new Error("MONGO_URI is not defined");
}

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);

// Protected route example
app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ message: 'Access to protected route successful' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






// import express from 'express';
// import dotenv from 'dotenv';
// import passport from 'passport';
// import authRoutes from './routes/auth'; // Adjust path as necessary
// import passportConfig from './config/passport';

// dotenv.config(); // Load environment variables

// const app = express(); // Declare 'app' only once here

// // Middleware
// app.use(express.json()); // JSON payloads middleware
// app.use(passport.initialize()); // Initialize passport
// passportConfig(passport); // Configure passport strategies

// // Routes
// app.use('/api/auth', authRoutes); // Authentication routes

// // Protected route (example)
// app.get(
//   '/protected',
//   passport.authenticate('jwt', { session: false }),
//   (req, res) => {
//     res.json({ message: 'Access to protected route successful' });
//   }
// );

// // Server start logic
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
