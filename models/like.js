"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose;

var likeSchema = new Schema({
  title: { type: String, required: true },
});

module.exports = mongoose.model("Like", likeSchema);
