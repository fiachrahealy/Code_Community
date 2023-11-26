const { getAuth } = require("firebase-admin/auth");

// Check Valid Request

exports.checkValidRequest = (req, res, next) => {

  getAuth()
    .verifyIdToken(req.headers.token)
    .then((decodedToken) => {
      req.body.currentUser = decodedToken;
      next();
    })
    .catch((error) => {
      throw error;
    });

};