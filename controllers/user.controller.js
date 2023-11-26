var userModel = require('../models/user.model.js');
var cloudinary = require('cloudinary');

// Signup User

exports.signupUser = async (req, res, next) => {

  userModel.countDocuments({
    username: req.body.username
  }, async function (err, count) {
    if (count > 0) {
      const error = new Error('Username taken');
      return next(error);
    }

    const file = req.file;
    if (!file) {
      const error = new Error('No File');
      error.httpStatusCode = 400;
      return next(error);
    }

    var avatarURL = "";

    await cloudinary.v2.uploader.upload(file.path, {
      folder: 'users',
      use_filename: true
    }, function (err, result) {
      avatarURL = result.url;
    });

    console.log("Avatar uploaded to" + avatarURL);

    userModel.create({
      username: req.body.username,
      email: req.body.email,
      avatar: avatarURL,
      editXP: 0,
      learnXP: 0
    },
      function (err, post) {
        if (err) {
          return next(err);
        }
        next();
        res.json(post);
      });
  });

};

// UnAuthorised User

exports.unauthorisedUser = async (req, res, next) => {

  res.redirect('/');

};

// Get Current User ID

exports.getCurrentUserID = async (req, res, next) => {

  userModel.findOne({
    email: req.body.currentUser.email
  }, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return null;
    }
    res.json({
      id: user._id
    });
  });

}

// Get User By ID

exports.getUserByID = async (req, res, next) => {

  userModel.findById(req.params.id, function (err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return null;
    }
    res.json({
      _id: user._id,
      username: user.username,
      avatar: user.avatar
    });
  });

}

// Get User By Username

exports.getUserByUsername = async (req, res, next) => {

  userModel.findOne({
    username: req.params.username
  }, function (err, user) {
    if (err) {
      return next(err);
    }
    res.json({
      _id: user._id,
      username: user.username,
      avatar: user.avatar
    });
  });

}

// Get All Users

exports.getAllUsers = async (req, res, next) => {

  userModel.find(function (err, users) {
    if (err) {
      return next(err);
    }
    for (var i = 0; i < users.length; i++) {
      users[i] = {
        _id: users[i]._id,
        username: users[i].username,
        avatar: users[i].avatar,
        editXP: users[i].editXP,
        learnXP: users[i].learnXP
      };
    }
    res.json(users);
  });

};

// Update User Edit XP

exports.updateUserEditXP = (req, res, next) => {

  userModel.findOneAndUpdate({
    _id: req.body.userID
  }, {
    $inc: {
      editXP: req.body.xp
    }
  }, function (err, record) {
    if (err) {
      return next(err);
    }
    res.json(record);
  });

};

// Update User Learn XP

exports.updateUserLearnXP = (req, res, next) => {

  userModel.findOneAndUpdate({
    _id: req.body.userID
  }, {
    $inc: {
      learnXP: req.body.xp
    }
  }, function (err, record) {
    if (err) {
      return next(err);
    }
    res.json(record);
  });

};