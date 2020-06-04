"use strict";

const Liker = require("../models/liker");

exports.getAllLikers = (req, res, next) => {
  Liker.find({}, (error, likers) => {
    if (error) next(error);
    req.data = likers;
    next();
  });
};

exports.saveLiker = (req, res) => {
  let newLiker = new Liker({
    name: req.body.name,
    message: req.body.message,
  });
  newLiker.save((error, result) => {
    if (error) res.send(error);
    res.render("thanks");
  });
};
