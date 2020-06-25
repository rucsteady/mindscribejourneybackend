const express = require("express"),
  layouts = require("express-ejs-layouts"),
  app = express(),
  router = require("./routes/index"),
  homeController = require("./controllers/homeController"),
  errorController = require("./controllers/errorController"),
  subscribersController = require("./controllers/subscribersController.js"),
  usersController = require("./controllers/usersController.js"),
  likesController = require("./controllers/likesController.js"),
  mongoose = require("mongoose"),
  methodOverride = require("method-override"),
  passport = require("passport"),
  cookieParser = require("cookie-parser"),
  expressSession = require("express-session"),
  expressValidator = require("express-validator"),
  connectFlash = require("connect-flash"),
  User = require("./models/user");

// starting with sprint 5 api
mongoose.connect(
  process.env.MONGODB_URI ||
    "mongodb://nils12:nils12@ds157707.mlab.com:57707/heroku_1bw65rfv",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

app.use(layouts);

app.use(express.static("public"));
app.use(expressValidator());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());

app.use(cookieParser("secret_passcode"));
app.use(
  expressSession({
    secret: "secret_passcode",
    cookie: { maxAge: 4000000 },
    resave: false,
    saveUninitialized: false,
  })
);
app.use(connectFlash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

app.use("/", router);

const server = app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  }),
  io = require("socket.io")(server);
  require("./controllers/chatController")(io);
