// src/models/Post.js

const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  roleBadge: String, // e.g. "Volunteer of Candidate X"
  content: String,
  mediaUrl: String,
  tags: [String],
  category: String,
  location: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    comment: String,
    timestamp: { type: Date, default: Date.now },
  }],
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
