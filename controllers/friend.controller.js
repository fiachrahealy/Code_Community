var friendRequestModel = require('../models/friend-request.model.js');
var friendModel = require('../models/friend.model.js');

// Send Friend Request

exports.sendFriendRequest = (req, res, next) => {

  friendRequestModel.create({
    sender: req.body.sender,
    receiver: req.body.receiver
  },
    function (err, post) {
      if (err) {
        return next(err);
      }
      next();
      res.json(post)
    });

};

// Get All Friend Requests

exports.getAllFriendRequests = async (req, res, next) => {

  friendRequestModel.find(function (err, requests) {
    if (err) {
      return next(err);
    }
    res.json(requests);
  });

};

// Add Friend

exports.addFriend = (req, res, next) => {

  friendModel.create({
    user1: req.body.user1,
    user2: req.body.user2
  },
    function (err, post) {
      if (err) {
        return next(err);
      }
      next();
      res.json(post)
    });

  friendRequestModel.find({
    sender: req.body.user1,
    receiver: req.body.user2
  }).remove().exec();
  friendRequestModel.find({
    sender: req.body.user2,
    receiver: req.body.user1
  }).remove().exec();


};

// Get All Friends

exports.getAllFriends = (req, res, next) => {

  friendModel.find(function (err, requests) {
    if (err) {
      return next(err);
    }
    res.json(requests);
  });

};

// Delete Friend Request

exports.deleteFriendRequest = (req, res, next) => {

  friendRequestModel.remove({
    sender: req.body.user1,
    receiver: req.body.user2
  },
    function (err) {
      if (err) {
        return next(err);
      }
    });

  friendRequestModel.remove({
    sender: req.body.user2,
    receiver: req.body.user1
  },
    function (err, post) {
      if (err) {
        return next(err);
      }
      next();
      res.json(post)
    });

};

// Delete Friend

exports.deleteFriend = (req, res, next) => {

  friendModel.remove({
    user1: req.body.user2,
    user2: req.body.user1
  },
    function (err) {
      if (err) {
        return next(err);
      }
    });

  friendModel.remove({
    user1: req.body.user1,
    user2: req.body.user2
  },
    function (err, post) {
      if (err) {
        return next(err);
      }
      next();
      res.json(post)
    });

};
