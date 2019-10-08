const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  number: {
    type: Number
    // required: true
  },
  title: {
    type: String,
    required: true
  },
  writer: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  file: {
    type: Buffer
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = Notice = mongoose.model('notice', NoticeSchema);
