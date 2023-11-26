var mongoose = require('mongoose');

// Lesson Schema

var LessonSchema = new mongoose.Schema({
  title: String,
  course: String,
  chunks: Array
});

module.exports = mongoose.model('Lesson', LessonSchema);