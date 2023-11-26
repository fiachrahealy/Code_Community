var mongoose = require('mongoose');

// Lesson Chunk Edited Record Schema

var LessonChunkEditedRecordSchema = new mongoose.Schema({
  course: String,
  user: String,
  lesson: String,
  timestamp: String,
  chunkEdited: String,
});

module.exports = mongoose.model('Lesson_Chunk_Edited_Record', LessonChunkEditedRecordSchema);