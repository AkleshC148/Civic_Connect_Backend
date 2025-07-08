// src/models/Complaint.js

const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  isAnonymous: {
    type: Boolean,
    default: false,
  },
  category: String,
  description: String,
  evidenceUrl: String,
  status: {
    type: String,
    enum: ['submitted', 'reviewing', 'resolved', 'dismissed'],
    default: 'submitted',
  },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
