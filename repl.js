const mongoose = require("mongoose"),
  Subscriber = require("./models/subscriber"),
  Like = require("./models/like");

var testLike, testSubscriber;

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://nils12:nils12@ds157707.mlab.com:57707/heroku_1bw65rfv",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.Promise = global.Promise;

Subscriber.remove({})
  .then((items) => console.log(`Removed ${items.n} records!`))
  .then(() => {
    return Like.remove({});
  })
  .then((items) => console.log(`Removed ${items.n} records!`))
  .then(() => {
    return Subscriber.create({
      name: "Jon",
      email: "Jon@jonwexler.com",
      zipCode: "12345",
    });
  })
  .then((subscriber) => {
    console.log(`Created Subscriber: ${subscriber.getInfo()}`);
  })
  .then(() => {
    return Subscriber.findOne({
      name: "Jon",
    });
  })
  .then((like) => {
    testLike = like;
    console.log(`Created like: ${like.title}`);
  })
  .then(() => {
    testSubscriber.likes.push(testLike);
    testSubscriber.save();
  })
  .then(() => {
    return Subscriber.populate(testSubscriber, "likes");
  })
  .then((subsriber) => console.log(subscriber))
  .then(() => {
    return Subscriber.find({ likes: mongoose.Types.ObjectId(testLike._id) });
  })
  .then((subscriber) => console.log(subscriber));
