// src/models/User.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: String,
  password: String, // Optional if OTP-based login
  role: {
    type: String,
    enum: ['voter', 'candidate', 'volunteer', 'admin'],
    default: 'voter',
  },
  region: {
    type: String,
    required: true,
  },
  status: {
  type: String,
  enum: ['active','pending verification', 'suspended'],
  default: 'pending verification',
},
  supportingParty: String,
  isVerified: {
    type: Boolean,
    default: false,
  },
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
