import mongoose, { model } from "mongoose";
const { Schema } = mongoose;
const likeSchema = new Schema({
	name: { type: String, required: true },
});

export default model("Like", likeSchema);
