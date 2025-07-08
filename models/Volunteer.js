// src/models/VolunteerApplication.js

const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    enum: ['election', 'candidate'],
    required: true,
  },
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
  },
  region: String,
  idProofUrl: String,
  addressProofUrl: String,
  selfieUrl: String,
  reason: String,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  certificateUrl: String,
}, { timestamps: true });

module.exports = mongoose.model('Volunteer', volunteerSchema);
