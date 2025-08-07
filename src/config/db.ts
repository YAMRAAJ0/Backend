import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '../utils/logger'; 

dotenv.config();

const connectDB = async () => {
  try {
    // Connect to MongoDB using the URI from environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase');
    logger.info(`MongoDB Connected: ${conn.connection.host}`); // Log successful connection
  } catch (err) {
    logger.error('MongoDB Connection Error:', err); // Log connection error
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;

