const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  likersController = require("./controllers/likersController"),
  mongoose = require("mongoose"),
  layouts = require("express-ejs-layouts");

mongoose.connect("mongodb://localhost:27017/todaydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
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

app.get("/likers", likersController.getAllLikers, (req, res, next) => {
  console.log(req.data);
  res.send(req.data);
});

app.get("/likes", homeController.showLikes);
app.get("/shirts", homeController.getShirts);

app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);
app.post("/", homeController.postedLikeUpForm);

app.use(errorController.respondInternalError);
app.use(errorController.respondNoResourceFound);

app.listen(app.get("port"), () => {
  console.log(`Server running at port: ${app.get("port")}`);
});
