var mongoose = require('mongoose');

// Lesson Chunks Reordered Record Schema

var LessonChunksReorderedRecordSchema = new mongoose.Schema({
  course: String,
  user: String,
  lesson: String,
  timestamp: String,
  previousChunks: Array,
  newChunks: Array
});

module.exports = mongoose.model('Lesson_Chunks_Reordered_Record', LessonChunksReorderedRecordSchema);