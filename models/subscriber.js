import mongoose from "mongoose";

const { Schema } = mongoose;

const subscriberSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
	},
	email: {
		type: String,
		trim: true,
		required: "Email is required",
		lowercase: true,
	},
	zipCode: {
		type: Number,
		min: [10000, "Zip code too short"],
		max: 99999,
	},
	likes: [
		{
			type: Schema.Types.ObjectId,
			ref: "Like",
		},
	],
});

subscriberSchema.methods.getInfo = function () {
	return `Name: ${this.name} Email: ${this.email} Zip Code: ${this.zipCode}`;
};

export default mongoose.model("Subscriber", subscriberSchema);
