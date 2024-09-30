import mongoose from "mongoose";
import passport from "passport";
import cookieParser from "cookie-parser";
import express, { json, static as serveStatic, urlencoded } from "express";
import expressSession from "express-session";
import methodOverride from "method-override";
import User from "./models/user.js";
import router from "./routes/index.js";

const { connect, set } = mongoose;

const app = express();

// MongoDB-Verbindung
connect(
	process.env.MONGODB_URI || "mongodb://localhost:27017/mindscribejourney", // Verwende die lokale MongoDB-Instanz
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	},
);

mongoose.Promise = global.Promise;
set("useFindAndModify", false);

app.set("port", process.env.PORT || 3001);

app.use(methodOverride("_method", { methods: ["POST", "GET"] }));
app.use(serveStatic("public"));

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

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/api", router);

app.use((req, res) => {
	res.status(404).json({
		success: false,
		message: "Resource not found",
	});
});

// Fehlerbehandlung
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({
		success: false,
		message: err.message,
	});
});

// Server starten
const server = app.listen(app.get("port"), () => {
	console.log(`Server running at http://localhost:${app.get("port")}`);
});
