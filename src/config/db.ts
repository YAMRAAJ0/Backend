// // src/config/db.ts
// import mongoose, { ConnectOptions } from 'mongoose';
// import dotenv from 'dotenv';
// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI as string, {
//       useUnifiedTopology: true, // useUnifiedTopology is valid
//     } as ConnectOptions);
//     console.log('MongoDB connected');
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// };

// export default connectDB;  // Default export









import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    // Make sure to replace '5000' with your actual MongoDB URI
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase');
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;



