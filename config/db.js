const mongoose = require('mongoose');
const config = require('config');

const dbConnection = async () => {
  try {
    await mongoose.connect(config.get('MONGO_URI'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongodb connection established');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = dbConnection;
