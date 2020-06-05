"use strict";
const mongoose = require("mongoose"),
  { Schema } = mongoose;

var likerSchema = new Schema({
  name: { type: String, required: true },
  message: { type: String, required: true },
});

module.exports = mongoose.model("Liker", likerSchema);
