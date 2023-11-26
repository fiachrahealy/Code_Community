var mongoose = require('mongoose');

// Course Lesson Added Record Schema

var CourseLessonAddedRecordSchema = new mongoose.Schema({
  course: String,
  user: String,
  timestamp: String,
  lessonAdded: String
});

module.exports = mongoose.model('Course_Lesson_Added_Record', CourseLessonAddedRecordSchema);