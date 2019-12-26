const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  number: {
    type: Number,
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
  files: {
    type: {
      locations: [{ type: String }],
      keys: [{ type: String }],
      originalnames: [{ type: String }]
    }
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = Notice = mongoose.model('notice', NoticeSchema);
