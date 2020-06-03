const mongoose = require("mongoose");

const likeSchema = mongoose.Schema({
  name: String,
  message: String,
});

module.exports = mongoose.model("Liker", likeSchema);

