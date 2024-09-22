import mongoose, { Schema, Document } from 'mongoose';

interface IExample extends Document {
  name: string;
  value: number;
}

const ExampleSchema: Schema = new Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
});

export default mongoose.model<IExample>('Example', ExampleSchema);
