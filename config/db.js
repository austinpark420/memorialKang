const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');

mongoose.Promise = global.Promise;

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true
    });

    console.log('MongoDB Connected...');
  } catch (error) {
    console.log('ERROR: ', error.message);

    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
