// server.js or your backend file
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');

const app = express();
const uri = "mongodb+srv://tio:yamraaj@devopsfarm.9xfyi.mongodb.net/yourdb?retryWrites=true&w=majority&appName=devopsfarm"; // Correct MongoDB Atlas URI

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with a unique name
  },
});

const upload = multer({ storage });

// Mongoose Model
const DataSchema = new mongoose.Schema({
  name: String,
  image: String,
  imageAlt: String,
  imageName: String,
});

const Data = mongoose.model('Data', DataSchema);

// Fetch data route
app.get('/api/data', async (req, res) => {
  try {
    const data = await Data.find();
    res.json(data);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  }
});

// Add data route
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
    console.error('Error adding data:', error.message); // Log the error message
    res.status(500).send('Error adding data');
  }
});


// Delete data route
app.delete('/api/data/:id', async (req, res) => {
  try {
    await Data.findByIdAndDelete(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    console.error('Error deleting data:', error);
    res.status(500).send('Error deleting data');
  }
});

// Connect to MongoDB and start the server
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(error => console.error('Error connecting to MongoDB:', error));
