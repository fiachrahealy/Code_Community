var mongoose = require('mongoose');

// Friend Schema

var FriendSchema = new mongoose.Schema({
  user1: String,
  user2: String
});

module.exports = mongoose.model('Friend', FriendSchema);