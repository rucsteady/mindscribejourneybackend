import mongoose from "mongoose";

const { Schema, model } = mongoose;

const likeSchema = new Schema({
	name: { type: String, required: true },
});

export default model("Like", likeSchema);
