var mongoose = require('mongoose');

// Friend Request Schema

var FriendRequestSchema = new mongoose.Schema({
  sender: String,
  receiver: String
});

module.exports = mongoose.model('Friend_Request', FriendRequestSchema);