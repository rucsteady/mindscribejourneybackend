"use strict";

module.exports = {
  getIndex: (req, res) => {
    res.render("index");
  },
  getShirts: (req, res) => {
    res.render("shirts");
  },

};
