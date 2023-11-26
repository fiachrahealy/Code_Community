var mongoose = require('mongoose');

// Course Lesson Removed Record Schema

var CourseLessonRemovedRecordSchema = new mongoose.Schema({
  course: String,
  user: String,
  timestamp: String,
  lessonRemoved: String
});

module.exports = mongoose.model('Course_Lesson_Removed_Record', CourseLessonRemovedRecordSchema);