const Subscriber = require("./subscriber");
const passportLocalMongoose = require("passport-local-mongoose");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema(
	{
		name: {
			first: {
				type: String,
				trim: true,
			},
			last: {
				type: String,
				trim: true,
			},
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
			unique: true,
		},
		zipCode: {
			type: Number,
			min: [10000, "Zip code too shirt"],
			max: 99999,
		},
		likes: [
			{
				type: Schema.Types.ObjectId,
				ref: "Like",
			},
		],
		subscribedAccount: {
			type: Schema.Types.ObjectId,
			ref: "Subscriber",
		},
	},
	{
		timestamps: true,
	},
);

userSchema.virtual("fullName").get(function () {
	return `${this.name.first} ${this.name.last}`;
});

userSchema.pre("save", function (next) {
	if (this.subscribedAccount === undefined) {
		Subscriber.findOne({
			email: this.email,
		})
			.then((subscriber) => {
				this.subscribedAccount = subscriber;
				next();
			})
			.catch((error) => {
				console.log(`Error in connecting subscriber:
   ${error.message}`);
				next(error);
			});
	} else {
		next();
	}
});

userSchema.plugin(passportLocalMongoose, {
	usernameField: "email",
});

module.exports = mongoose.model("User", userSchema);
