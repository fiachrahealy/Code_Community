var messageModel = require('../models/message.model.js');
var unopenedMessageModel = require('../models/unopened-message.model.js');

// Send Message

exports.sendMessage = (req, res, next) => {

  messageModel.create(req.body,
    function (err, message) {
      if (err) {
        return next(err);
      }
      unopenedMessageModel.create(req.body,
        function (err, record) {
          if (err) {
            return next(err);
          }
          next();
          res.json(record);
        });
    });

};

// Get Messages

exports.getMessagesForUsers = (req, res, next) => {

  messageModel.find({
    sender: req.query.user1,
    recipient: req.query.user2
  }, function (err, messages1) {
    if (err) {
      return next(err);
    }
    messageModel.find({
      sender: req.query.user2,
      recipient: req.query.user1
    }, function (err, messages2) {
      if (err) {
        return next(err);
      }
      var messages = messages2.concat(messages1);
      res.json(messages);
    });
  });

};

// Get Unopened Messages

exports.getUnopenedMessagesForUser = (req, res, next) => {

  unopenedMessageModel.find({
    recipient: req.params.id
  }, function (err, records) {
    if (err) {
      return next(err);
    }
    res.json(records);
  });

};

// Delete Unopened Message

exports.deleteUnopenedMessage = (req, res, next) => {

  unopenedMessageModel.deleteMany({
    recipient: req.body.recipient,
    sender: req.body.sender
  }, function (err, record) {
    if (err) {
      return next(err);
    }
    next();
    res.json(record);
  });

};