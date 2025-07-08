// src/models/Candidate.js

const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  party: String,
  symbol: String,
  manifesto: String,
  provisions: [String], // e.g. ["food", "transport", "refreshments"]
  volunteers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Candidate', candidateSchema);
