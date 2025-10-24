const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Skill title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: ['Technology', 'Arts', 'Music', 'Languages', 'Sports', 'Cooking', 'Business', 'Other']
  },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
  },
  availability: {
    type: String,
    required: true,
    enum: ['Weekdays', 'Weekends', 'Flexible']
  },
  mode: {
    type: String,
    required: true,
    enum: ['Online', 'Offline', 'Both']
  },
  duration: {
    type: String,
    default: 'Flexible'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Skill', skillSchema);
