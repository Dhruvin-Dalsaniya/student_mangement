const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  courseCode: {
    type: String,
    required: [true, 'Please provide a course code'],
    unique: true,
    uppercase: true
  },
  name: {
    type: String,
    required: [true, 'Please provide a course name'],
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  instructor: {
    type: String,
    required: true
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
    max: 4
  },
  semester: {
    type: String,
    required: true,
    enum: ['Fall', 'Spring', 'Summer']
  },
  capacity: {
    type: Number,
    required: true,
    default: 60
  },
  enrolledStudents: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  }],
  schedule: {
    days: [String],
    time: String,
    room: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Course', courseSchema);
