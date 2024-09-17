//controllers/likesController.js

import { OK, INTERNAL_SERVER_ERROR } from "http-status-codes";
import { findByIdAndUpdate } from "../models/user";

import {
	find,
	create as _create,
	findById,
	findByIdAndUpdate as _findByIdAndUpdate,
	findByIdAndRemove,
	deleteMany,
} from "../models/like";
const getLikeParams = (body) => {
	return {
		name: body.name,
	};
};
export function index(req, res, next) {
	find()
		.then((likes) => {
			res.locals.likes = likes;
			next();
		})
		.catch((error) => {
			console.log(`Error fetching likes: ${error.message}`);
			next(error);
		});
}
export function indexView(req, res) {
	res.render("likes/index");
}
export function newLike(req, res) {
	res.render("likes/new");
}
export function create(req, res, next) {
	const likeParams = getLikeParams(req.body);
	_create(likeParams)
		.then((like) => {
			res.locals.redirect = "/likes";
			res.locals.like = like;
			next();
		})
		.catch((error) => {
			console.log(`Error saving like:${error.message}`);
			next(error);
		});
}
export function redirectView(req, res, next) {
	const redirectPath = res.locals.redirect;
	if (redirectPath) res.redirect(redirectPath);
	else next();
}
export function show(req, res, next) {
	const likeId = req.params.id;
	findById(likeId)
		.then((like) => {
			res.locals.like = like;
			next();
		})
		.catch((error) => {
			console.log(`Error fetching like by ID:
         ${error.message}`);
			next(error);
		});
}
export function showView(req, res) {
	res.render("likes/show");
}
export function edit(req, res, next) {
	const likeId = req.params.id;
	findById(likeId)
		.then((like) => {
			res.render("likes/edit", {
				like: like,
			});
		})
		.catch((error) => {
			console.log(`Error fetching like by ID: ${error.message}`);
			next(error);
		});
}
export function update(req, res, next) {
	const likeId = req.params.id;
	const likeParams = getLikeParams(req.body);
	_findByIdAndUpdate(likeId, {
		$set: likeParams,
	})
		.then((like) => {
			res.locals.redirect = `/likes/${likeId}`;
			res.locals.like = like;
			next();
		})
		.catch((error) => {
			console.log(`Error updating like by ID:
                     ${error.message}`);
			next(error);
		});
}
export function deleteLike(req, res, next) {
	const likeId = req.params.id;
	findByIdAndRemove(likeId)
		.then(() => {
			res.locals.redirect = "/likes";
			next();
		})
		.catch((error) => {
			console.log(`Error deleting like by ID:
                     ${error.message}`);
			next();
		});
}
export function deleteLikes(req, res, next) {
	deleteMany({})
		.then(() => {
			res.locals.redirect = "/likes";
			next();
		})
		.catch((error) => {
			console.log(`Error deleting likes:
                     ${error.message}`);
			next();
		});
}
export function respondJSON(req, res) {
	res.json({
		status: OK,
		data: res.locals,
	});
}
export function errorJSON(error, req, res, next) {
	let errorObject;

	if (error) {
		errorObject = {
			status: INTERNAL_SERVER_ERROR,
			message: error.message,
		};
	} else {
		errorObject = {
			status: INTERNAL_SERVER_ERROR,
			message: "Unknown Error.",
		};
	}
	res.json(errorObject);
}
export function filterUserLikes(req, res, next) {
	const currentUser = res.locals.currentUser;
	if (currentUser) {
		const mappedLikes = res.locals.likes.map((like) => {
			const userJoined = currentUser.likes.some((userLike) => {
				return userLike.equals(like._id);
			});
			return Object.assign(like.toObject(), { joined: userJoined });
		});
		res.locals.likes = mappedLikes;
		next();
	} else {
		next();
	}
}
export function join(req, res, next) {
	const likeId = req.params.id;
	const currentUser = req.user;

	if (currentUser) {
		findByIdAndUpdate(currentUser, {
			$addToSet: {
				likes: likeId,
			},
		})
			.then(() => {
				res.locals.success = true;
				next();
			})
			.catch((error) => {
				next(error);
			});
	} else {
		next(new Error("User must log in."));
	}
}
