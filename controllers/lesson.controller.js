var lessonModel = require('../models/lesson.model.js');
var textChunkModel = require('../models/text-chunk.model.js');
var imageChunkModel = require('../models/image-chunk.model.js');
var quizChunkModel = require('../models/quiz-chunk.model.js');
var codeChunkModel = require('../models/code-chunk.model.js');
var cloudinary = require('cloudinary');

// Get Lesson

exports.getLesson = async (req, res, next) => {

  lessonModel.findById(req.params.id, function (err, course) {
    if (err) {
      return next(err);
    }
    res.json(course);
  });

};

// Create Lesson

exports.createLesson = (req, res, next) => {

  lessonModel.create({
    title: req.body.title,
    course: req.body.course
  },
    function (err, lesson) {
      if (err) {
        return next(err);
      }
      next();
      res.json(lesson)
    });

};

// Update Lesson Title

exports.updateLessonTitle = (req, res, next) => {

  lessonModel.findOneAndUpdate({
    _id: req.body.lessonID
  }, {
    title: req.body.newTitle
  }, function (err, lesson) {
    if (err) {
      return next(err);
    }
    res.json(lesson);
  });

};

// Update Lesson Chunks

exports.updateLessonChunks = (req, res, next) => {

  lessonModel.findOneAndUpdate({
    _id: req.body.lessonID
  }, {
    chunks: req.body.chunks
  }, function (err, lesson) {
    if (err) {
      return next(err);
    }
    res.json(lesson);
  });
};

// Get Text Chunk

exports.getTextChunk = async (req, res, next) => {

  textChunkModel.findById(req.params.id, function (err, chunk) {
    if (err) {
      return next(err);
    }
    res.json(chunk);
  });

};

// Create Text Chunk

exports.createTextChunk = (req, res, next) => {

  textChunkModel.create(req.body,
    function (err, chunk) {
      if (err) {
        return next(err);
      }
      next();
      res.json(chunk)
    });

};

// Update Text Chunk

exports.updateTextChunk = (req, res, next) => {

  textChunkModel.findOneAndUpdate({
    _id: req.body.chunkID
  }, req.body, function (err, chunk) {
    if (err) {
      return next(err);
    }
    next();
    res.json(chunk);
  });

};

// Get Image Chunk

exports.getImageChunk = async (req, res, next) => {

  imageChunkModel.findById(req.params.id, function (err, chunk) {
    if (err) {
      return next(err);
    }
    res.json(chunk);
  });

};

// Create Image Chunk

exports.createImageChunk = async (req, res, next) => {

  const file = req.file;
  if (!file) {
    const error = new Error('No File');
    error.httpStatusCode = 400;
    return next(error);
  }

  var imageURL = "";

  await cloudinary.v2.uploader.upload(file.path, {
    folder: 'images',
    use_filename: true
  }, function (err, result) {
    imageURL = result.url;
  });

  console.log("Image uploaded to" + imageURL);

  await imageChunkModel.create({
    title: req.body.title,
    lesson: req.body.lesson,
    file: imageURL
  },
    function (err, post) {
      if (err) {
        return next(err);
      }
      next();
      res.json(post);
    });

};

// Update Image Chunk

exports.updateImageChunk = async (req, res, next) => {

  const file = req.file;
  if (!file) {
    await imageChunkModel.findOneAndUpdate({
      _id: req.body.chunkID
    }, {
      title: req.body.title,
      lesson: req.body.lesson,
      file: req.body.originalFile
    }, function (err, chunk) {
      if (err) {
        return next(err);
      }
      next();
      res.json(chunk);
    });
  }

  var imageURL = "";

  await cloudinary.v2.uploader.upload(file.path, {
    folder: 'images',
    use_filename: true
  }, function (err, result) {
    imageURL = result.url;
  });

  console.log("Image uploaded to" + imageURL);

  await imageChunkModel.findOneAndUpdate({
    _id: req.body.chunkID
  }, {
    title: req.body.title,
    lesson: req.body.lesson,
    file: imageURL
  }, function (err, chunk) {
    if (err) {
      return next(err);
    }
    next();
    res.json(chunk);
  });

};

// Get Quiz Chunk

exports.getQuizChunk = async (req, res, next) => {

  quizChunkModel.findById(req.params.id, function (err, chunk) {
    if (err) {
      return next(err);
    }
    res.json(chunk);
  });

};

// Create Quiz Chunk

exports.createQuizChunk = (req, res, next) => {

  quizChunkModel.create(req.body,
    function (err, chunk) {
      if (err) {
        return next(err);
      }
      next();
      res.json(chunk)
    });

};

// Update Quiz Chunk

exports.updateQuizChunk = (req, res, next) => {

  quizChunkModel.findOneAndUpdate({
    _id: req.body.chunkID
  }, req.body, function (err, chunk) {
    if (err) {
      return next(err);
    }
    next();
    res.json(chunk);
  });

};

// Get Code Chunk

exports.getCodeChunk = async (req, res, next) => {

  codeChunkModel.findById(req.params.id, function (err, chunk) {
    if (err) {
      return next(err);
    }
    res.json(chunk);
  });

};

// Create Code Chunk

exports.createCodeChunk = (req, res, next) => {

  codeChunkModel.create(req.body,
    function (err, chunk) {
      if (err) {
        return next(err);
      }
      next();
      res.json(chunk)
    });

};

// Update Code Chunk

exports.updateCodeChunk = (req, res, next) => {

  codeChunkModel.findOneAndUpdate({
    _id: req.body.chunkID
  }, req.body, function (err, chunk) {
    if (err) {
      return next(err);
    }
    next();
    res.json(chunk);
  });

};