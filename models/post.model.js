var mongoose = require('mongoose');

// Post Schema

var PostSchema = new mongoose.Schema({
  title: String,
  body: String,
  user: String,
  timestamp: String,
  type: Number
});

module.exports = mongoose.model('Post', PostSchema);