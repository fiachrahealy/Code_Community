var mongoose = require('mongoose');

// Course Lesson Added Record Schema

var LessonTitleChangedRecordSchema = new mongoose.Schema({
  course: String,
  user: String,
  lesson: String,
  timestamp: String,
  previousTitle: String,
  newTitle: String
});

module.exports = mongoose.model('Lesson_Title_Changed_Record', LessonTitleChangedRecordSchema);