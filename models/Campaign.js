// src/models/Campaign.js

const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  candidate: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Candidate',
    required: true,
  },
  title: String,
  description: String,
  constituency: String,
  region: String,
  popularityScore: Number,
  provisions: [String],
  tags: [String],
}, { timestamps: true });

module.exports = mongoose.model('Campaign', campaignSchema);
