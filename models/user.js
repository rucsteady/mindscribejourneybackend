const Subscriber = require("./subscriber");
const mongoose = require("mongoose"),
  { Schema } = mongoose,
  userSchema = new Schema(
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
      password: {
        type: String,
        required: true,
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
    }
  );

userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

userSchema.pre("save", function (next) {
  let user = this;
  if (user.subscribedAccount === undefined) {
    Subscriber.findOne({
      email: user.email,
    })
      .then((subscriber) => {
        user.subscribedAccount = subscriber;
        next();
      })
      .catch((error) => {
        console.log(`Error in connecting subscriber:${error.message}`);
        next(error);
      });
  } else {
    next();
  }
});

module.exports = mongoose.model("User", userSchema);
