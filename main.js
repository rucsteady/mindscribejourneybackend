import connectFlash from "connect-flash";
import cookieParser from "cookie-parser";
import express, { json, static, urlencoded } from "express";
import layouts from "express-ejs-layouts";
import expressSession from "express-session";
import expressValidator from "express-validator";
import methodOverride from "method-override";
import { Promise, connect, set } from "mongoose";
import { deserializeUser, initialize, serializeUser, session, use } from "passport";
import { deserializeUser as _deserializeUser, serializeUser as _serializeUser, createStrategy } from "./models/user";
import router from "./routes/index";
const app = express();

// starting with sprint 5 api
connect(
  process.env.MONGODB_URI ||
    "mongodb://nils12:nils12@ds157707.mlab.com:57707/heroku_1bw65rfv",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);
Promise = global.Promise;
set("useFindAndModify", false);
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");
app.use(
  methodOverride("_method", {
    methods: ["POST", "GET"],
  })
);

app.use(layouts);

app.use(static("public"));
app.use(expressValidator());
app.use(
  urlencoded({
    extended: false,
  })
);

app.use(json());

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

app.use(initialize());
app.use(session());
use(createStrategy());
serializeUser(_serializeUser());
deserializeUser(_deserializeUser());

app.use((req, res, next) => {
  res.locals.loggedIn = req.isAuthenticated();
  res.locals.currentUser = req.user;
  res.locals.flashMessages = req.flash();
  next();
});

app.use("/", router);

const server = app.listen(app.get("port"), () => {
    console.log(`Server running at http://localhost:${app.get("port")}`);
  });
const io = require("socket.io")(server);
  require("./controllers/chatController")(io);
