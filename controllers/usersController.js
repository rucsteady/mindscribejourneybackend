import User from "../models/user.js";
import passport from "passport";

const { authenticate: _authenticate } = passport;

const getUserParams = (body) => {
	return {
		name: {
			first: body.first,
			last: body.last,
		},
		email: body.email,
		password: body.password,
		zipCode: body.zipCode,
	};
};

export function index(req, res, next) {
	User.find()
		.then((users) => {
			res.status(200).json({
				success: true,
				data: users,
			});
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				message: `Error fetching users: ${error.message}`,
			});
		});
}

export function validate(req, res, next) {
	req.sanitizeBody("email").normalizeEmail({ all_lowercase: true }).trim();
	req.check("email", "Email is invalid").isEmail();
	req
		.check("zipCode", "Zip code is invalid")
		.notEmpty()
		.isInt()
		.isLength({ min: 5, max: 5 })
		.equals(req.body.zipCode);
	req.check("password", "Password cannot be empty").notEmpty();
	req.getValidationResult().then((error) => {
		if (!error.isEmpty()) {
			const messages = error.array().map((e) => e.msg);
			req.skip = true;
			res.status(400).json({
				success: false,
				errors: messages,
			});
		} else {
			next();
		}
	});
}

export function create(req, res, next) {
	if (req.skip) return next();
	const newUser = new User(getUserParams(req.body));
	User.register(newUser, req.body.password, (error, user) => {
		if (user) {
			res.status(201).json({
				success: true,
				message: `${user.fullName}'s account created successfully!`,
				data: user,
			});
		} else {
			res.status(500).json({
				success: false,
				message: `Failed to create user account because: ${error.message}.`,
			});
		}
	});
}

export function logout(req, res, next) {
	req.logout();
	res.status(200).json({
		success: true,
		message: "You have been logged out!",
	});
	next();
}
export const authenticate = (req, res, next) => {
	passport.authenticate("local", (err, user, info) => {
		if (err) {
			return res.status(500).json({
				success: false,
				message: `Authentication error: ${err.message}`,
			});
		}
		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Authentication failed.",
				info: info.message,
			});
		}
		req.logIn(user, (loginErr) => {
			if (loginErr) {
				return res.status(500).json({
					success: false,
					message: `Login error: ${loginErr.message}`,
				});
			}
			return res.status(200).json({
				success: true,
				message: "Logged in successfully!",
				data: user,
			});
		});
	})(req, res, next);
};

export function show(req, res, next) {
	const userId = req.params.id;
	User.findById(userId)
		.then((user) => {
			if (user) {
				res.status(200).json({
					success: true,
					data: user,
				});
			} else {
				res.status(404).json({
					success: false,
					message: "User not found",
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				message: `Error fetching user by ID: ${error.message}`,
			});
		});
}

export function update(req, res, next) {
	const userId = req.params.id;
	const userParams = getUserParams(req.body);
	User.findByIdAndUpdate(userId, { $set: userParams }, { new: true })
		.then((user) => {
			if (user) {
				res.status(200).json({
					success: true,
					message: "User updated successfully",
					data: user,
				});
			} else {
				res.status(404).json({
					success: false,
					message: "User not found",
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				message: `Error updating user by ID: ${error.message}`,
			});
		});
}

export function deleteUsers(req, res, next) {
	const userId = req.params.id;
	User.findByIdAndRemove(userId)
		.then(() => {
			res.status(200).json({
				success: true,
				message: "User deleted successfully",
			});
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				message: `Error deleting user by ID: ${error.message}`,
			});
		});
}
