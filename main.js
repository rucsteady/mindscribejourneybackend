const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  mongoose = require("mongoose"),
  likersController = require("./controllers/likersController"),
  Liker = require("./models/liker"),
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

/*
Liker.create(
  {
    name: "Nele",
    message: "Ella",
  },

  function (error, savedDocument) {
    if (error) console.log(error);
    console.log(savedDocument);
  }
);
*/


app.get("/likes", likersController.getAllLikers, (req, res, next) => {
  console.log(req.data);
  res.render("likers", { likers: req.data });
});

// app.get("/likes", homeController.showLikes);
app.get("/shirts", homeController.getShirts);

app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

app.post("/", homeController.postedLikeUpForm);

app.use(errorController.respondInternalError);
app.use(errorController.respondNoResourceFound);

app.listen(app.get("port"), () => {
  console.log(`Server running at port: ${app.get("port")}`);
});
