const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection URI
const uri = process.env.MONGODB_URI || "mongodb+srv://tio:yamraaj@devopsfarm.9xfyi.mongodb.net/?retryWrites=true&w=majority&appName=devopsfarm";

// Create a MongoClient (for MongoDB and `users` collection)
const client = new MongoClient(uri, {
  tls: true,
  tlsInsecure: true,
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Set up multer for file storage (for file uploads)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with a unique name
  },
});
const upload = multer({ storage });

// Mongoose schema and model (for `data` collection)
const DataSchema = new mongoose.Schema({
  name: String,
  image: String,
  imageAlt: String,
  imageName: String,
});
const Data = mongoose.model('Data', DataSchema);

// MongoDB and Mongoose connection for `data` collection
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongoose connected to MongoDB'))
  .catch(error => console.error('Error connecting to MongoDB with Mongoose:', error));

// Fetch data from `data` collection
app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// Add data to `data` collection with file upload
app.post('/api/data', upload.single('image'), async (req, res) => {
  const { name, imageAlt, imageName } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!image) {
    return res.status(400).send('Image is required');
  }

  const newItem = new Data({
    name,
    image,
    imageAlt,
    imageName,
  });

  try {
    await newItem.save();
    res.json(newItem);
  } catch (error) {
    console.error('Error adding data:', error.message);
    res.status(500).send('Error adding data');
  }
});

// Delete data from `data` collection
app.delete('/api/data/:id', async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).send('Error deleting data');
  }
});

// Connect to MongoDB and set up routes for `users` collection
async function connectToDB() {
  try {
    await client.connect();
    console.log("MongoClient connected to MongoDB!");

    const database = client.db("your_db_name"); // Change to your DB name
    const collection = database.collection("users");

    // Get all users
    app.get('/api/users', async (req, res) => {
      try {
        const users = await collection.find({}).toArray();
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: "Error fetching users" });
      }
    });

    // Add new user
    app.post('/api/users', async (req, res) => {
      const { name, email, mobile, username } = req.body;
      if (!name || !email || !mobile || !username) {
        return res.status(400).json({ error: "All fields are required" });
      }
      try {
        const newUser = { name, email, mobile, username };
        const result = await collection.insertOne(newUser);
        res.json(result.ops[0]); // Return the newly created user
      } catch (error) {
        res.status(500).json({ error: 'Failed to save user' });
      }
    });

    // Update user by ID
    app.put('/api/users/:id', async (req, res) => {
      const { id } = req.params;
      const { name, email, mobile, username } = req.body;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      try {
        const updatedUser = await collection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: { name, email, mobile, username } },
          { returnOriginal: false } // Return the updated document
        );
        if (!updatedUser.value) {
          return res.status(404).json({ error: "User not found" });
        }
        res.json(updatedUser.value);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update user' });
      }
    });

    // Delete user by ID
    app.delete('/api/users/:id', async (req, res) => {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      try {
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
          res.json({ message: "User deleted successfully" });
        } else {
          res.status(404).json({ error: "User not found" });
        }
      } catch (error) {
        res.status(500).json({ error: "Error deleting user" });
      }
    });

  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

connectToDB();

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});





// const express = require('express');
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // MongoDB connection URI
// const uri = process.env.MONGODB_URI || "mongodb+srv://tio:yamraaj@devopsfarm.9xfyi.mongodb.net/?retryWrites=true&w=majority&appName=devopsfarm";

// // Create a MongoClient
// const client = new MongoClient(uri, {
//   tls: true,
//   tlsInsecure: true,
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// // Connect to MongoDB and set up routes
// async function connectToDB() {
//   try {
//     await client.connect();
//     console.log("Connected to MongoDB!");

//     const database = client.db("your_db_name"); // Change to your DB name
//     const collection = database.collection("users"); // Change to your collection name

//     // Get all users
//     app.get('/api/users', async (req, res) => {
//       try {
//         const users = await collection.find({}).toArray();
//         res.json(users);
//       } catch (error) {
//         res.status(500).json({ error: "Error fetching users" });
//       }
//     });

//     // Add new user
//     app.post('/api/users', async (req, res) => {
//       const { name, email, mobile, username } = req.body;
//       if (!name || !email || !mobile || !username) {
//         return res.status(400).json({ error: "All fields are required" });
//       }
//       try {
//         const newUser = { name, email, mobile, username };
//         const result = await collection.insertOne(newUser);
//         res.json(result.ops[0]); // Return the newly created user
//       } catch (error) {
//         res.status(500).json({ error: 'Failed to save user' });
//       }
//     });

//     // Update user by ID
//     app.put('/api/users/:id', async (req, res) => {
//       const { id } = req.params;
//       const { name, email, mobile, username } = req.body;
//       if (!ObjectId.isValid(id)) {
//         return res.status(400).json({ error: "Invalid ID format" });
//       }

//       try {
//         const updatedUser = await collection.findOneAndUpdate(
//           { _id: new ObjectId(id) },
//           { $set: { name, email, mobile, username } },
//           { returnOriginal: false } // Return the updated document
//         );
//         if (!updatedUser.value) {
//           return res.status(404).json({ error: "User not found" });
//         }
//         res.json(updatedUser.value);
//       } catch (error) {
//         res.status(500).json({ error: 'Failed to update user' });
//       }
//     });

//     // Delete user by ID
//     app.delete('/api/users/:id', async (req, res) => {
//       const { id } = req.params;
//       if (!ObjectId.isValid(id)) {
//         return res.status(400).json({ error: "Invalid ID format" });
//       }

//       try {
//         const result = await collection.deleteOne({ _id: new ObjectId(id) });
//         if (result.deletedCount === 1) {
//           res.json({ message: "User deleted successfully" });
//         } else {
//           res.status(404).json({ error: "User not found" });
//         }
//       } catch (error) {
//         res.status(500).json({ error: "Error deleting user" });
//       }
//     });

//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// }

// connectToDB();

// // Start the server
// app.listen(port, () => {
//   console.log(`Backend server is running on http://localhost:${port}`);
// });






// // server.js or your backend file
// const express = require('express');
// const mongoose = require('mongoose');
// const multer = require('multer');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// const uri = "mongodb+srv://tio:yamraaj@devopsfarm.9xfyi.mongodb.net/?retryWrites=true&w=majority&appName=devopsfarm"; // Correct MongoDB Atlas URI

// app.use(cors());
// app.use(express.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Set up multer for file storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Save with a unique name
//   },
// });

// const upload = multer({ storage });

// // Mongoose Model
// const DataSchema = new mongoose.Schema({
//   name: String,
//   image: String,
//   imageAlt: String,
//   imageName: String,
// });

// const Data = mongoose.model('Data', DataSchema);

// // Fetch data route
// app.get('/api/data', async (req, res) => {
//   try {
//     const data = await Data.find();
//     res.json(data);
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     res.status(500).send('Error fetching data');
//   }
// });

// // Add data route
// app.post('/api/data', upload.single('image'), async (req, res) => {
//   const { name, imageAlt, imageName } = req.body;
//   const image = req.file ? req.file.filename : null;

//   if (!image) {
//     return res.status(400).send('Image is required');
//   }

//   const newItem = new Data({
//     name,
//     image,
//     imageAlt,
//     imageName,
//   });

//   try {
//     await newItem.save();
//     res.json(newItem);
//   } catch (error) {
//     console.error('Error adding data:', error.message);
//     res.status(500).send('Error adding data');
//   }
// });



// // Delete data route
// app.delete('/api/data/:id', async (req, res) => {
//   try {
//     await Data.findByIdAndDelete(req.params.id);
//     res.sendStatus(200);
//   } catch (error) {
//     console.error('Error deleting data:', error);
//     res.status(500).send('Error deleting data');
//   }
// });

// // Connect to MongoDB and start the server
// mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
//   .catch(error => console.error('Error connecting to MongoDB:', error));
