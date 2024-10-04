
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  image: { type: String, required: true } // Assuming you want to store the image path
});

export default mongoose.model('Course', courseSchema);

