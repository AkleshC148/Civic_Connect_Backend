const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  phone: {
    type: String,
    default: null
  },

  availability: {
    type: String,
    enum: [
      'Weekdays (Morning)',
      'Weekdays (Afternoon)',
      'Weekdays (Evening)',
      'Weekends (Morning)',
      'Weekends (Afternoon)',
      'Weekends (Evening)'
    ],
    required: true
  },

  candidateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    default: null  // null means this volunteer signed up for admin
  },

  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },

  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // could be an Admin or Candidate (User model handles both)
    default: null
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
