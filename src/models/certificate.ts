

import mongoose from 'mongoose';

const certificateSchema = new mongoose.Schema({
  certifiedType: {
    type: String,
    required: true,
  },
  certifiedName: {
    type: String,
    required: true,
  },
  certifiedCourse: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  issuedDate: {
    type: Date,
    required: true,
  },
});

const Certificate = mongoose.model('Certificate', certificateSchema);

export default Certificate;


