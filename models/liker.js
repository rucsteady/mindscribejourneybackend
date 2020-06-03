"use strict";

const mongoose = require("mongoose"),
 likeSchema = mongoose.Schema({  
  name: String,
  message: String,
});

module.exports = mongoose.model("Liker", likeSchema);

