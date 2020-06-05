const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  mongoose = require("mongoose"),
  likersController = require("./controllers/likersController"),
  subscribersController = require("./controllers/subscribersController"),
  usersController = require("./controllers/usersController"),
  User = require("./models/user"),
  layouts = require("express-ejs-layouts");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://nils12:nils12@ds157707.mlab.com:57707/heroku_1bw65rfv",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
mongoose.Promise = global.Promise;

db.once("open", () => {
  console.log("Succesfully connected to MongoDB using Mongoose!");
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(layouts);
app.use(express.static("public"));

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.get("/", homeController.getIndex);
app.post("/", likersController.saveLiker);

/*
Liker.deleteMany()
.exec()
.then(() => {
  console.log("Likers database is now empty");
});
*/

app.get("/likes", likersController.getAllLikers);
app.get("/shirts", homeController.getShirts);
app.get("/contact", homeController.showSignUp);
app.get("/subscribers", subscribersController.getAllSubscribers);
app.post("/contact", subscribersController.saveSubscriber);

app.get("/users", usersController.index);

app.use(errorController.respondInternalError);
app.use(errorController.respondNoResourceFound);

app.listen(app.get("port"), () => {
  console.log(`Server running at port: ${app.get("port")}`);
});
