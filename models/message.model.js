var mongoose = require('mongoose');

// Message Schema

var MessageSchema = new mongoose.Schema({
  sender: String,
  recipient: String,
  text: String,
  timestamp: String
});

module.exports = mongoose.model('Message', MessageSchema);