"use strict";

const mongoose = require("mongoose"),
  { Schema } = mongoose,
  likeSchema = new Schema(
    {
      title: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model("Like", likeSchema);
