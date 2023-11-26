var mongoose = require('mongoose');

// CodeChunk Schema

var CodeChunkSchema = new mongoose.Schema({
  title: String,
  lesson: String,
  code: String,
  language: Number
});

module.exports = mongoose.model('Code_Chunk', CodeChunkSchema);