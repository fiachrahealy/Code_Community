var mongoose = require('mongoose');

// Lesson Chunks Added Record Schema

var LessonChunkAddedRecord = new mongoose.Schema({
  course: String,
  user: String,
  lesson: String,
  timestamp: String,
  chunkAdded: String
});

module.exports = mongoose.model('Lesson_Chunk_Added_Record', LessonChunkAddedRecord);