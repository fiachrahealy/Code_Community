var mongoose = require('mongoose');

// QuizChunk Schema

var QuizChunkSchema = new mongoose.Schema({
  title: String,
  lesson: String,
  question: String,
  answers: Array,
  correctAnswer: String
});

module.exports = mongoose.model('Quiz_Chunk', QuizChunkSchema);