const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  writer: {
    type: String,
    required: true
  },
  images: [{ type: String }],
  keys: [{ type: String }],
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = Image = mongoose.model('image', ImageSchema);
