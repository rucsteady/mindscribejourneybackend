import connectFlash from "connect-flash";
import cookieParser from "cookie-parser";
import express, { json, static as serveStatic, urlencoded } from "express";
import expressSession from "express-session";
import methodOverride from "method-override";
import mongoose, { connect, set } from "mongoose";
import {
	deserializeUser,
	initialize,
	serializeUser,
	session as passportSession,
	use,
} from "passport";
import {
	deserializeUser as _deserializeUser,
	serializeUser as _serializeUser,
	createStrategy,
} from "./models/user.js";
import router from "./routes/index.js";

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

mongoose.Promise = global.Promise;
set("useFindAndModify", false);

app.set("port", process.env.PORT || 3000);

// Middleware
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.use(serveStatic("public")); // Serviere statische Dateien

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
app.use(passportSession());
use(createStrategy());
serializeUser(_serializeUser());
deserializeUser(_deserializeUser());

app.use((req, res, next) => {
	res.locals.loggedIn = req.isAuthenticated();
	res.locals.currentUser = req.user;
	res.locals.flashMessages = req.flash();
	next();
});

app.use("/api", router);

app.use((req, res, next) => {
	res.status(404).json({ success: false, message: "Endpoint not found" });
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ success: false, error: err.message });
});

// Server- und Socket.IO-Einrichtung
const server = app.listen(app.get("port"), () => {
	console.log(`Server running at http://localhost:${app.get("port")}`);
});
import { Server } from "socket.io";
const io = new Server(server);

// Stelle sicher, dass `chatController.js` ebenfalls auf ES-Module umgestellt ist
import chatController from "./controllers/chatController.js";
chatController(io);
