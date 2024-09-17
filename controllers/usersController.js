import User, { find, register, findById, findByIdAndUpdate, findByIdAndRemove } from "../models/user";
import { authenticate as _authenticate } from "passport";
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
  find()
    .then((users) => {
      res.locals.users = users;
      next();
    })
    .catch((error) => {
      console.log(`Error fetching users: ${error.message}`);
      next(error);
    });
}
export function indexView(req, res) {
  res.render("users", {
    flashMessages: {
      success: "Loaded all users!",
    },
  });
}
export function validate(req, res, next) {
  req
    .sanitizeBody("email")
    .normalizeEmail({
      all_lowercase: true,
    })
    .trim();
  req.check("email", "Email is invalid").isEmail();
  req
    .check("zipCode", "Zip code is invalid")
    .notEmpty()
    .isInt()
    .isLength({
      min: 5,
      max: 5,
    })
    .equals(req.body.zipCode);
  req.check("password", "Password cannot be empty").notEmpty();
  req.getValidationResult().then((error) => {
    if (!error.isEmpty()) {
      const messages = error.array().map((e) => e.msg);
      req.skip = true;
      req.flash("error", messages.join(" and "));
      res.locals.redirect = "/users/new";
      next();
    } else {
      next();
    }
  });
}
export function newUser(req, res) {
  res.render("users/new");
}
export function create(req, res, next) {
  if (req.skip) next();
  const newUser = new User(getUserParams(req.body));
  register(newUser, req.body.password, (error, user) => {
    if (user) {
      req.flash(
        "success",
        `${user.fullName}'s account created successfully!`
      );
      res.locals.redirect = "/users";
      next();
    } else {
      req.flash(
        "error",
        `Failed to create user account because: ${error.message}.`
      );
      res.locals.redirect = "/users/new";
      next();
    }
  });
}
export function redirectView(req, res, next) {
  const redirectPath = res.locals.redirect;
  if (redirectPath) res.redirect(redirectPath);
  else next();
}
export function login(req, res) {
  res.render("users/login");
}
export function logout(req, res, next) {
  req.logout();
  req.flash("success", "You have been logged out!");
  res.locals.redirect = "/";
  next();
}
export const authenticate = _authenticate("local", {
  failureRedirect: "/users/login",
  failureFlash: "Failed to login.",
  successRedirect: "/",
  successFlash: "Logged in!",
});
export function show(req, res, next) {
  let userId = req.params.id;
  findById(userId)
    .then((user) => {
      res.locals.user = user;
      next();
    })
    .catch((error) => {
      console.log(`Error fetching user by ID: ${error.message}`);
      next(error);
    });
}
export function showView(req, res) {
  res.render("users/show");
}
export function edit(req, res, next) {
  let userId = req.params.id;
  findById(userId)
    .then((user) => {
      res.render("users/edit", {
        user: user,
      });
    })
    .catch((error) => {
      console.log(`Error fetching user by ID: ${error.message}`);
      next(error);
    });
}
export function update(req, res, next) {
  let userId = req.params.id, userParams = {
    name: {
      first: req.body.first,
      last: req.body.last,
    },
    email: req.body.email,
    password: req.body.password,
    zipCode: req.body.zipCode,
  };
  findByIdAndUpdate(userId, {
    $set: userParams,
  })
    .then((user) => {
      res.locals.redirect = `/users/${userId}`;
      res.locals.user = user;
      next();
    })
    .catch((error) => {
      console.log(`Error updating user by ID: ${error.message}`);
      next(error);
    });
}
export function delete(req, res, next) {
  let userId = req.params.id;
  findByIdAndRemove(userId)
    .then(() => {
      res.locals.redirect = "/users";
      next();
    })
    .catch((error) => {
      console.log(`Error deleting user by ID: ${error.message}`);
      next();
    });
}
