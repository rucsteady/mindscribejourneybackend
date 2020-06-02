const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  layouts = require("express-ejs-layouts");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(layouts);
app.use(express.static("public"));

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.get("/", homeController.getIndex);
app.get("/likes", homeController.showLikes);
app.get("/shirts", homeController.getShirts);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);
app.post("/", homeController.postedLikeUpForm);

app.listen(app.get("port"), () => {
  console.log(`Server running at port: ${app.get("port")}`);
});
