var mongoose = require('mongoose');

// User Schema

var UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  avatar: String,
  editXP: Number,
  learnXP: Number
});

module.exports = mongoose.model('User', UserSchema);