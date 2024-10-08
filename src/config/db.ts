import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { logger } from '../utils/logger'; // Adjust the import path as necessary

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




// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// const connectDB = async () => {
//   try {
//     // Make sure to replace '5000' with your actual MongoDB URI
//     const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase');
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (err) {
//     console.error(err);
//     process.exit(1); // Exit process with failure
//   }
// };

// export default connectDB;



