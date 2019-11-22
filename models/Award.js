const mongoose = require('mongoose');

const AwardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  title: {
    type: String,
    required: true
  },
  winner: {
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
    default: Date.now,
    required: true
  }
});

module.exports = Award = mongoose.model('award', AwardSchema);
