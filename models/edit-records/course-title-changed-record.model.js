var mongoose = require('mongoose');

// Course Title Changed Record Schema

var CourseTitleChangedRecordSchema = new mongoose.Schema({
  course: String,
  user: String,
  timestamp: String,
  previousTitle: String,
  newTitle: String
});

module.exports = mongoose.model('Course_Title_Changed_Record', CourseTitleChangedRecordSchema);