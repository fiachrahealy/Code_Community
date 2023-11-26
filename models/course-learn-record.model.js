var mongoose = require('mongoose');

// Course Lesson Added Record Schema

var CourseLearnRecordSchema = new mongoose.Schema({
  course: String,
  user: String,
  lessonsCompleted: Array,
  completed: Boolean,
});

module.exports = mongoose.model('Course_Learn_Record', CourseLearnRecordSchema);