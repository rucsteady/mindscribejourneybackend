"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  likeSchema = new Schema({
    name: { type: String, required: true },
  });

module.exports = mongoose.model("Like", likeSchema);
