var mongoose = require('mongoose');

// Lesson Chunk Removed Record Schema

var LessonChunkRemovedRecordSchema = new mongoose.Schema({
  course: String,
  user: String,
  lesson: String,
  timestamp: String,
  chunkRemoved: String
});

module.exports = mongoose.model('Lesson_Chunk_Removed_Record', LessonChunkRemovedRecordSchema);