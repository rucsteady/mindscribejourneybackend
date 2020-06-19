const express = require("express"),
  app = express(),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  mongoose = require("mongoose"),
  likersController = require("./controllers/likersController"),
  likesController = require("./controllers/likesController"),
  subscribersController = require("./controllers/subscribersController"),
  usersController = require("./controllers/usersController"),
  router = express.Router(),
  expressSession = require("express-session"),
  expressValidator = require("express-validator"),
  passport = require("passport"),
  cookieParser = require("cookie-parser"),
  connectFlash = require("connect-flash"),
  User = require("./models/user"),
  Like = require("./models/like"),
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
router.use(expressValidator());

app.use(layouts);
router.use(layouts);
router.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

router.use(cookieParser("secret_passcode"));
router.use(
  expressSession({
    secret: "secret_passcode",
    cookie: { maxAge: 4000000 },
    resave: false,
    saveUninitialized: false,
  })
);

router.use(passport.initialize());
router.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

router.use(connectFlash());

router.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

app.use("/", router);
router.get("/users", usersController.index, usersController.indexView);
router.get("/users/new", usersController.new);
router.post(
  "/users/create",
  usersController.validate,
  usersController.create,
  usersController.redirectView
);

router.get("/users/login", usersController.login);
router.post("/users/login", usersController.authenticate);
router.get(
  "/users/logout",
  usersController.logout,
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

router.post(
  "/delete/Likes",
  likesController.deleteLikes,
  likesController.redirectView
);

router.get(
  "/subscribers",
  subscribersController.index,
  subscribersController.indexView
);
router.get("/subscribers/new", subscribersController.new);
router.post(
  "/subscribers/create",
  subscribersController.create,
  subscribersController.redirectView
);
router.get(
  "/subscribers/:id",
  subscribersController.show,
  subscribersController.showView
);
router.get("/subscribers/:id/edit", subscribersController.edit);
router.put(
  "/subscribers/:id/update",
  subscribersController.update,
  subscribersController.redirectView
);
router.delete(
  "/subscribers/:id/delete",
  subscribersController.delete,
  subscribersController.redirectView
);

router.get("/likes", likesController.index, likesController.indexView);
router.get("/likes/new", likesController.new);
router.post(
  "/likes/create",
  likesController.create,
  likesController.redirectView
);
router.get("/likes/:id", likesController.show, likesController.showView);
router.get("/likes/:id/edit", likesController.edit);
router.put(
  "/likes/:id/update",
  likesController.update,
  likesController.redirectView
);
router.delete(
  "/likes/:id/delete",
  likesController.delete,
  likesController.redirectView
);

Like.create(
  {
    name: "Burger",
  },
  function (error, savedDocument) {
    if (error) console.log(error);
    console.log(savedDocument);
  }
);

app.get("/", homeController.getIndex);
app.post("/", likersController.saveLiker);
app.get("/likes", likersController.getAllLikers);

//app.get("/contact", homeController.showSignUp);
//app.get("/subscribers", subscribersController.getAllSubscribers);
//app.post("/contact", subscribersController.saveSubscriber);

app.get("/shirts", homeController.getShirts);

app.use(errorController.respondInternalError);
app.use(errorController.respondNoResourceFound);

app.listen(app.get("port"), () => {
  console.log(`Server running at port: ${app.get("port")}`);
});
