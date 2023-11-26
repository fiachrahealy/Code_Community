var courseLessonAddedRecordModel = require('../models/edit-records/course-lesson-added-record.model.js');
var courseLessonRemovedRecordModel = require('../models/edit-records/course-lesson-removed-record.model.js');
var courseTitleChangedRecordModel = require('../models/edit-records/course-title-changed-record.model.js');
var courseLessonsReorderedRecordModel = require('../models/edit-records/course-lessons-reordered-record.model.js');
var lessonChunksAddedRecordModel = require('../models/edit-records/lesson-chunk-added-record.model.js');
var lessonChunksRemovedRecordModel = require('../models/edit-records/lesson-chunk-removed-record.model.js');
var lessonChunksReorderedRecordModel = require('../models/edit-records/lesson-chunks-reordered-record.model.js');
var lessonChunksEditedRecordModel = require('../models/edit-records/lesson-chunk-edited-record.model.js');
var lessonTitleChangedRecordModel = require('../models/edit-records/lesson-title-changed-record.model.js');
var courseLearnRecordModel = require('../models/course-learn-record.model.js');

// Get All Course Lesson Added Records

exports.getAllCourseLessonAddedRecords = async (req, res, next) => {

  courseLessonAddedRecordModel.find(function (err, records) {
    if (err) {
      return next(err);
    }
    res.json(records);
  });

};

// Create Course Lesson Added Record

exports.createCourseLessonAddedRecord = (req, res, next) => {

  courseLessonAddedRecordModel.create(req.body,
    function (err, record) {
      if (err) {
        return next(err);
      }
      next();
      res.json(record)
    });

};

// Get All Course Lesson Removed Records

exports.getAllCourseLessonRemovedRecords = async (req, res, next) => {

  courseLessonRemovedRecordModel.find(function (err, records) {
    if (err) {
      return next(err);
    }
    res.json(records);
  });

};

// Create Course Lesson Removed Record

exports.createCourseLessonRemovedRecord = (req, res, next) => {

  courseLessonRemovedRecordModel.create(req.body,
    function (err, record) {
      if (err) {
        return next(err);
      }
      next();
      res.json(record)
    });

};

// Get All Course Title Changed Records

exports.getAllCourseTitleChangedRecords = async (req, res, next) => {

  courseTitleChangedRecordModel.find(function (err, records) {
    if (err) {
      return next(err);
    }
    res.json(records);
  });

};

// Create Course Title Changed Record

exports.createCourseTitleChangedRecord = (req, res, next) => {

  courseTitleChangedRecordModel.create(req.body,
    function (err, record) {
      if (err) {
        return next(err);
      }
      next();
      res.json(record)
    });

};

// Get All Course Lessons Reordered Records

exports.getAllCourseLessonsReorderedRecords = async (req, res, next) => {

  courseLessonsReorderedRecordModel.find(function (err, records) {
    if (err) {
      return next(err);
    }
    res.json(records);
  });

};

// Create Course Lessons Reordered Record

exports.createCourseLessonsReorderedRecord = (req, res, next) => {

  courseLessonsReorderedRecordModel.create(req.body,
    function (err, record) {
      if (err) {
        return next(err);
      }
      next();
      res.json(record)
    });

};

// Get All Lesson Chunk Added Records

exports.getAllLessonChunkAddedRecords = async (req, res, next) => {

  lessonChunksAddedRecordModel.find(function (err, records) {
    if (err) {
      return next(err);
    }
    res.json(records);
  });

};

// Create Lesson Chunk Added Record

exports.createLessonChunkAddedRecord = (req, res, next) => {

  lessonChunksAddedRecordModel.create(req.body,
    function (err, record) {
      if (err) {
        return next(err);
      }
      next();
      res.json(record)
    });

};

// Get All Lesson Chunk Removed Records

exports.getAllLessonChunkRemovedRecords = async (req, res, next) => {

  lessonChunksRemovedRecordModel.find(function (err, records) {
    if (err) {
      return next(err);
    }
    res.json(records);
  });

};

// Create Lesson Chunk Removed Record

exports.createLessonChunkRemovedRecord = (req, res, next) => {

  lessonChunksRemovedRecordModel.create(req.body,
    function (err, record) {
      if (err) {
        return next(err);
      }
      next();
      res.json(record)
    });

};

// Get All Lesson Chunks Reordered Records

exports.getAllLessonChunksReorderedRecords = async (req, res, next) => {

  lessonChunksReorderedRecordModel.find(function (err, records) {
    if (err) {
      return next(err);
    }
    res.json(records);
  });

};

// Create Lesson Chunks Reordered Record

exports.createLessonChunksReorderedRecord = (req, res, next) => {

  lessonChunksReorderedRecordModel.create(req.body,
    function (err, record) {
      if (err) {
        return next(err);
      }
      next();
      res.json(record)
    });

};

// Get All Lesson Chunk Edited Records

exports.getAllLessonChunkEditedRecords = async (req, res, next) => {

  lessonChunksEditedRecordModel.find(function (err, records) {
    if (err) {
      return next(err);
    }
    res.json(records);
  });

};

// Create Lesson Chunk Edited Record

exports.createLessonChunkEditedRecord = (req, res, next) => {

  lessonChunksEditedRecordModel.create(req.body,
    function (err, record) {
      if (err) {
        return next(err);
      }
      next();
      res.json(record)
    });

};

// Get All Lesson Title Changed Records

exports.getAllLessonTitleChangedRecords = async (req, res, next) => {

  lessonTitleChangedRecordModel.find(function (err, records) {
    if (err) {
      return next(err);
    }
    res.json(records);
  });

};

// Create Lesson Title Changed Record

exports.createLessonTitleChangedRecord = (req, res, next) => {

  lessonTitleChangedRecordModel.create(req.body,
    function (err, record) {
      if (err) {
        return next(err);
      }
      next();
      res.json(record)
    });

};

// Create Course Learn Record

exports.createCourseLearnRecord = (req, res, next) => {

  courseLearnRecordModel.create(req.body,
    function (err, record) {
      if (err) {
        return next(err);
      }
      next();
      res.json(record)
    });

};

// Update Course Learn Record

exports.updateCourseLearnRecord = (req, res, next) => {

  courseLearnRecordModel.findOneAndUpdate({
    course: req.body.courseID,
    user: req.body.userID,
  }, {
    $push: {
      lessonsCompleted: req.body.lessonCompleted
    },
    completed: req.body.completed
  }, {
    new: true,
    safe: true,
    upsert: true
  }, function (err, record) {
    if (err) {
      return next(err);
    }
    res.json(record);
  });
};


// Get All Course Learn Records

exports.getAllCourseLearnRecords = async (req, res, next) => {

  courseLearnRecordModel.find(function (err, records) {
    if (err) {
      return next(err);
    }
    res.json(records);
  });

};

// Get Course Learn Record

exports.getCourseLearnRecord = async (req, res, next) => {

  courseLearnRecordModel.findOne({
    course: req.query.courseID,
    user: req.query.userID
  }, function (err, record) {
    if (err) {
      return next(err);
    }
    res.json(record);
  });

};

// Delete Course Learn Record

exports.deleteCourseLearnRecord = async (req, res, next) => {

  courseLearnRecordModel.deleteOne({
    course: req.body.courseID,
    user: req.body.userID
  },
    function (err, record) {
      if (err) {
        return next(err);
      }
      next();
      res.json(record)
    });

};
