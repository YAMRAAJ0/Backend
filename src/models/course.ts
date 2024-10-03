// import mongoose, { Schema, Document } from 'mongoose';

// export interface ICourse extends Document {
//   title: string;
//   description: string;
//   duration: number;
// }

// const courseSchema: Schema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   duration: { type: Number, required: true },
// });

// const Course = mongoose.model<ICourse>('Course', courseSchema);
// export default Course;
// src/models/course.ts
// import mongoose from 'mongoose';

// const courseSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   duration: { type: String, required: true },
//   image: { type: String }, // Field to store image path
// }, { timestamps: true });

// const Course = mongoose.model('Course', courseSchema);

// export default Course;


// src/models/course.ts
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  image: { type: String, required: true } // Assuming you want to store the image path
});

export default mongoose.model('Course', courseSchema);



// // /src/models/course.ts
// import mongoose, { Document, Schema } from 'mongoose';

// export interface ICourse extends Document {
//   title: string;
//   description: string;
//   duration: number;
// }

// const courseSchema = new Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   duration: { type: Number, required: true },
// });

// export default mongoose.model<ICourse>('Course', courseSchema);
