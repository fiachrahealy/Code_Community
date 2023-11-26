var mongoose = require('mongoose');

// Course Schema

var CourseSchema = new mongoose.Schema({
  title: String,
  level: String,
  lessons: Array,
  ratings: Array,
});

module.exports = mongoose.model('Course', CourseSchema);