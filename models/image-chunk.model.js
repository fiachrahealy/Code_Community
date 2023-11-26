var mongoose = require('mongoose');

// ImageChunk Schema

var ImageChunkSchema = new mongoose.Schema({
  title: String,
  lesson: String,
  file: String
});

module.exports = mongoose.model('Image_Chunk', ImageChunkSchema);