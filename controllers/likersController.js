"use strict";

const Liker = require("../models/liker");

exports.getAllLikers = (req, res) => {
  Liker.find({})
    .exec()
    .then((likers) => {
      res.render("likes", {
        likers: likers,
      });
    })
    .catch((error) => {
      console.log(error.message);
      return [];
    })
    .then(() => {
      console.log("promise complete");
    });
};

exports.saveLiker = (req, res) => {
  let newLiker = new Liker({
    name: req.body.name,
    message: req.body.message,
  });
  newLiker.save().then((result) => {
    Liker.find({})
      .exec()
      .then((likers) => {
        res.render("likes", {
          likers: likers,
        });
      })
      .catch((error) => {
        if (error) res.send(error);
      });
  });
};
