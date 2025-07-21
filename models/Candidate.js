// models/Candidate.js
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true // One candidate profile per user
  },
  party: {
    type: String,
    required: true,
    trim: true
  },
  constituency: {
    type: String,
    required: true,
    trim: true
  },
  symbol: {
    type: String, // URL to party symbol image
  },
  manifesto: {
    type: String, // Could be a URL or plain text
  },
  campaignPoints: [{
    type: String // Array of bullet points or slogans
  }],
  socialLinks: {
    website: { type: String },
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Candidate', candidateSchema);
