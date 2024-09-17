import connectFlash from "connect-flash";
import cookieParser from "cookie-parser";
import express, { json, static as serveStatic, urlencoded } from "express";
import layouts from "express-ejs-layouts";
import expressSession from "express-session";
import expressValidator from "express-validator";
import methodOverride from "method-override";
import mongoose, { connect, set } from "mongoose"; // Keine Zuweisung zu Promise notwendig
import {
	deserializeUser,
	initialize,
	serializeUser,
	session,
	use,
} from "passport";
import {
	deserializeUser as _deserializeUser,
	serializeUser as _serializeUser,
	createStrategy,
} from "./models/user";
import router from "./routes/index";

const app = express();

// MongoDB-Verbindung
connect(
	process.env.MONGODB_URI ||
		"mongodb://nils12:nils12@ds157707.mlab.com:57707/heroku_1bw65rfv",
	{
		useNewUrlParser: true,
		useCreateIndex: true,
		useUnifiedTopology: true,
	},
);

// Setze mongoose.Promise auf die globale Promise-Implementierung
mongoose.Promise = global.Promise;
set("useFindAndModify", false);

// Express-Einstellungen
app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

// Middleware
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.use(layouts);
app.use(serveStatic("public")); // Verwende den Alias für `static`
app.use(expressValidator());
app.use(
	urlencoded({
		extended: false,
	}),
);
app.use(json());
app.use(cookieParser("secret_passcode"));
app.use(
	expressSession({
		secret: "secret_passcode",
		cookie: { maxAge: 4000000 },
		resave: false,
		saveUninitialized: false,
	}),
);
app.use(connectFlash());
app.use(initialize());
app.use(session());
use(createStrategy());
serializeUser(_serializeUser());
deserializeUser(_deserializeUser());

// Globale Middleware für Flash-Nachrichten und Benutzer
app.use((req, res, next) => {
	res.locals.loggedIn = req.isAuthenticated();
	res.locals.currentUser = req.user;
	res.locals.flashMessages = req.flash();
	next();
});

// Routen
app.use("/", router);

// Server- und Socket.IO-Einrichtung
const server = app.listen(app.get("port"), () => {
	console.log(`Server running at http://localhost:${app.get("port")}`);
});
const io = require("socket.io")(server);
require("./controllers/chatController")(io);
