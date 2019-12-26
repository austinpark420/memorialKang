const mongoose = require('mongoose');

const MemorialHistorySchema = new mongoose.Schema({
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
  date: {
    type: Date,
    required: true
  }
});

module.exports = MemorialHistory = mongoose.model(
  'memorialHistory',
  MemorialHistorySchema
);
