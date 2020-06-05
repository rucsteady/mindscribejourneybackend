"use strict";

const mongoose = require("mongoose"),
  subscriberSchema = mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    zipCode: {
      type: Number,
      min: [10000, "Zip code too short"],
      max: 99999,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: "Email is required",
      lowercase: true,      
    },
  });

module.exports = mongoose.model("Subscriber", subscriberSchema);
