var mongoose = require('mongoose');

// Unopened Message Schema

var UnopenedMessageSchema = new mongoose.Schema({
  sender: String,
  recipient: String
});

module.exports = mongoose.model('Unopened_Message', UnopenedMessageSchema);