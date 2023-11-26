var mongoose = require('mongoose');

// Course Lessons Reordered Record Schema

var CourseLessonReorderedRecordSchema = new mongoose.Schema({
  course: String,
  user: String,
  timestamp: String,
  previousLessons: Array,
  newLessons: Array
});

module.exports = mongoose.model('Course_Lessons_Reordered_Record', CourseLessonReorderedRecordSchema);