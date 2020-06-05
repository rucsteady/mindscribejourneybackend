"use strict";

const mongoose = require("mongoose"),
  likeSchema = mongoose.Schema({
    name: { type: String, required: true },
    message: { type: String, required: true,},
  });

module.exports = mongoose.model("Liker", likeSchema);
