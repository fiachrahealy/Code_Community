var postModel = require('../models/post.model.js');
var userModel = require('../models/user.model.js');

// Get All Posts

exports.getAllPosts = (req, res, next) => {

  postModel.find(function (err, posts) {
    if (err) {
      return next(err);
    }
    res.json(posts);
  });

};

// Get Posts For User

exports.getPostsForUser = (req, res, next) => {

  userModel.findOne({
    username: req.params.username
  }, function (err, user) {
    if (err) {
      return next(err);
    }
    postModel.find({
      user: user._id
    }, function (err, posts) {
      if (err) {
        return next(err);
      }
      res.json(posts);
    });
  });

};

// Create Post

exports.createPost = (req, res, next) => {

  postModel.create(req.body,
    function (err, post) {
      if (err) {
        return next(err);
      }
      next();
      res.json(post)
    });

};