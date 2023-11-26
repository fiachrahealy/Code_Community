var mongoose = require('mongoose');
var dotenv = require('dotenv').config();
var courseModel = require('./models/course.model.js');

mongoose.Promise = require('bluebird');
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connection Succesful'))
  .catch((err) => console.error(err));

var courseNames = ["Angular", "Java", "C", "C#", "Python", "Javascript", "Typescript", "C++", "NodeJS", "HTML", "CSS", "React"];
var courseLevels = ["Intermediate", "Advanced", "Beginner", "Advanced", "Intermediate", "Beginner", "Intermediate", "Advanced", "Beginner", "Beginner", "Beginner", "Intermediate"];

var coursesCreated = 0;

for (var i = 0; i < courseNames.length; i++) {

  courseModel.create(
    {
      title: courseNames[i],
      level: courseLevels[i],
      lessons: [],
      ratings: []
    },
    function (err, record) {
      if (err) {
        console.log(err);
      }
      console.log(record.title + " Course Created");
      coursesCreated++;
      if (coursesCreated == courseNames.length) {
        mongoose.connection.close()
          .then(() => console.log('MongoDB Connection Closed'));
      }
    }
  );

}