"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose;

var subscriberSchema = new Schema({
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
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Like",
    },
  ],
  email: {
    type: String,
    trim: true,
    required: "Email is required",
    lowercase: true,
  },
});

subscriberSchema.methods.getInfo = function () {
  return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};

module.exports = mongoose.model("Subscriber", subscriberSchema);
