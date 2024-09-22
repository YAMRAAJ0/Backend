import mongoose, { ConnectOptions } from 'mongoose';
import { Collection, Document } from 'mongodb'; 
import dotenv from 'dotenv';

dotenv.config();

const uri: string = process.env.MONGODB_URI || "mongodb+srv://tio:yamraaj@devopsfarm.9xfyi.mongodb.net/?retryWrites=true&w=majority&appName=devopsfarm";

if (!uri) {
  throw new Error("MONGODB_URI environment variable is not defined");
}

// Declare collection variables
let authCollection: Collection<Document> | null = null;
let userCollection: Collection<Document> | null = null;
let dataCollection: Collection<Document> | null = null;
let certificatesCollection: Collection<Document> | null = null;

const connectionOptions: ConnectOptions = {
  serverSelectionTimeoutMS: 5000  
};

// Async function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB with connection string and options
    await mongoose.connect(uri, connectionOptions);
    console.log("MongoDB connected successfully!");

    // Ensure the connection is established and db is not undefined
    const db = mongoose.connection.useDb('devopsfarm'); // Specify your database name here
    if (!db) {
      throw new Error("Failed to access MongoDB database");
    }

    // Assign MongoDB collections
    authCollection = db.collection("auth");
    userCollection = db.collection("users");
    dataCollection = db.collection("datas");
    certificatesCollection = db.collection("certificates");

    console.log("Collections set successfully!");
  } catch (error) {
    // Handle connection errors
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit process with failure
  }
};

// Export as default
export default connectDB;

// Optional: Placeholder function to be implemented or removed
const course = async () => {
  throw new Error("Function not implemented");
};

// Export other collections and functions
export { userCollection, dataCollection, certificatesCollection, authCollection, course };
