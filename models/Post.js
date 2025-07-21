// models/post.js

const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['image', 'video'],
    required: true,
  },
});

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Assuming both voters and candidates are in User model
      required: true,
    },

    media: [mediaSchema], // Array of uploaded images/videos

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    dislikes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],

    isHighlight: {
      type: Boolean,
      default: false, // Admin will manually toggle this
    },

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment', // Optional, for future extension
      },
    ],
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

module.exports = mongoose.model('Post', postSchema);
