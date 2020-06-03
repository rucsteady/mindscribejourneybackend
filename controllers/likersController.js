const Liker = require("../models/like");

exports.getAllLikers = (req, res, next) => {
  Liker.find({}, (error, likers) => {
    if (error) next(error);
    req, (data = likers);
    next();
  });
};
