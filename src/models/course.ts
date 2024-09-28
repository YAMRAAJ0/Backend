import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  title: string;
  description: string;
  duration: number;
}

const courseSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  duration: { type: Number, required: true },
});

const Course = mongoose.model<ICourse>('Course', courseSchema);
export default Course;



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
