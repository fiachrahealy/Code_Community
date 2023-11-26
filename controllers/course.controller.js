var courseModel = require('../models/course.model.js');

// Get All Courses

exports.getAllCourses = async (req, res, next) => {

  courseModel.find(function (err, courses) {
    if (err) {
      return next(err);
    }
    res.json(courses);
  });

};

// Get Course

exports.getCourse = async (req, res, next) => {

  courseModel.findById(req.params.id, function (err, course) {
    if (err) {
      return next(err);
    }
    res.json(course);
  });

};

// Create Course Edit Record

exports.createCourseEditRecord = (req, res, next) => {

  courseEditRecordModel.create(req.body,
    function (err, record) {
      if (err) {
        return next(err);
      }
      next();
      res.json(record)
    });

};

// Update Course Title

exports.updateCourseTitle = (req, res, next) => {

  courseModel.findOneAndUpdate({
    _id: req.body.courseID
  }, {
    title: req.body.newTitle
  }, function (err, course) {
    if (err) {
      return next(err);
    }
    res.json(course);
  });

};

// Update Course Lessons

exports.updateCourseLessons = (req, res, next) => {

  courseModel.findOneAndUpdate({
    _id: req.body.courseID
  }, {
    lessons: req.body.lessons
  }, function (err, course) {
    if (err) {
      return next(err);
    }
    res.json(course);
  });
};

// Update Course Rating

exports.updateCourseRating = (req, res, next) => {

  courseModel.findOneAndUpdate({
    _id: req.body.courseID
  }, {
    $push: {
      ratings: req.body.rating
    }
  }, {
    new: true,
    safe: true,
    upsert: true
  }, function (err, course) {
    if (err) {
      return next(err);
    }
    res.json(course);
  });

};