const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  mongoose = require("mongoose"),
  likersController = require("./controllers/likersController"),
  subscribersController = require("./controllers/subscribersController"),
  usersController = require("./controllers/usersController"),
  router = express.Router(),
  User = require("./models/user"),
  methodOverride = require("method-override"),
  layouts = require("express-ejs-layouts");

mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://nils12:nils12@ds157707.mlab.com:57707/heroku_1bw65rfv",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

db.once("open", () => {
  console.log("Succesfully connected to MongoDB using Mongoose!");
});

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(express.static("public"));
app.use(layouts);
router.use(layouts);
router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

app.use("/", router);
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post(
  "/users/create",
  usersController.create,
  usersController.redirectView
);
router.get("/users/:id", usersController.show, usersController.showView);
router.get("/users/:id/edit", usersController.edit);
router.put(
  "/users/:id/update",
  usersController.update,
  usersController.redirectView
);
router.delete(
  "/users/:id/delete",
  usersController.delete,
  usersController.redirectView
);

app.get("/", homeController.getIndex);
app.post("/", likersController.saveLiker);
app.get("/likes", likersController.getAllLikers);
app.get("/shirts", homeController.getShirts);
app.get("/contact", homeController.showSignUp);
app.get("/subscribers", subscribersController.getAllSubscribers);
app.post("/contact", subscribersController.saveSubscriber);

app.use(errorController.respondInternalError);
app.use(errorController.respondNoResourceFound);

app.listen(app.get("port"), () => {
  console.log(`Server running at port: ${app.get("port")}`);
});
