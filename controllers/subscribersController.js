"use strict";

const Subscriber = require("../models/subscriber");

exports.getAllSubscribers = (req, res) => {
  Subscriber.find({})
    .exec()
    .then((subscribers) => {
      res.render("subscribers", {
        subscribers: subscribers,
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

exports.saveSubscriber = (req, res) => {
  let newSubscriber = new Subscriber({
    name: req.body.name,
    zipCode: req.body.zipCode,
    email: req.body.email,
  });
  newSubscriber.save().then((result) => {
    Subscriber.find({})
      .exec()
      .then((subscribers) => {
        res.render("subscribers", {
          subscribers: subscribers,
        });
      })
      .catch((error) => {
        if (error) res.send(error);
      });
  });
};
