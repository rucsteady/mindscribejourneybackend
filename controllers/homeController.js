"use strict";

module.exports = {
  showSignUp: (req, res) => {
    res.render("contact");
  },

  postedSignUpForm: (req, res) => {
    res.render("thanks");
  },

  postedLikeUpForm: (req, res) => {
    res.render("liked_thanks");
  },

  getIndex: (req, res) => {
    res.render("index");
  },

  getShirts: (req, res) => {
    res.render("shirts");
  },
};
