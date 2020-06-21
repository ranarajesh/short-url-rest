const mongoose = require('mongoose');

const URLSchema = new mongoose.Schema({
  longUrl: String,
  shortUrl: String,
  urlId: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('URL', URLSchema);
