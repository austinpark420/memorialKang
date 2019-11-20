const mongoose = require('mongoose');

let AwardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  writer: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  scholarshipFirst: {
    type: String,
    required: true
  },
  scholarshipFirstPrice: {
    type: String,
    required: true
  },
  scholarshipFirst: {
    type: String
  },
  scholarshipFirstPrice: {
    type: String
  },
  scholarshipSecond: {
    type: String
  },
  scholarshipSecondPrice: {
    type: String
  },
  scholarshipThird: {
    type: String
  },
  scholarshipThirdPrice: {
    type: String
  },
  literaryFirst: {
    type: String
  },
  literaryFirstAward: {
    type: String
  },
  literarySecond: {
    type: String
  },
  literarySecondAward: {
    type: String
  },
  literaryThird: {
    type: String
  },
  literaryThirdAward: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  }
});

module.exports = Award = mongoose.model('award', AwardSchema);
