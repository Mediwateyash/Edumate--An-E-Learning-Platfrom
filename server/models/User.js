const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  institute: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    // Only required for teachers, but we'll handle validation in the route or frontend
  },
  role: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending', // Default to pending, overridden for students/admin
  },
});

module.exports = mongoose.model('User', UserSchema);
