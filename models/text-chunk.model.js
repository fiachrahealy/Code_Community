var mongoose = require('mongoose');

// TextChunk Schema

var TextChunkSchema = new mongoose.Schema({
  title: String,
  lesson: String,
  text: String,
  fontSize: Number
});

module.exports = mongoose.model('Text_Chunk', TextChunkSchema);