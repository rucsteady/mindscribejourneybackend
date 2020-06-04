"use strict";

exports.showSignUp = (req, res) => {
  res.render("contact");
};

exports.postedSignUpForm = (req, res) => {
  res.render("thanks");
};

exports.postedLikeUpForm = (req, res) => {
  res.render("liked_thanks");
};

exports.getIndex = (req, res) => {
  res.render("index");
};

exports.getShirts = (req, res) => {
  res.render("shirts");
};
