//controllers/likesController.js

import { OK, INTERNAL_SERVER_ERROR } from "http-status-codes";
import { findByIdAndUpdate } from "../models/user.js";
import {
	find,
	create as _create,
	findById,
	findByIdAndUpdate as _findByIdAndUpdate,
	findByIdAndRemove,
	deleteMany,
} from "../models/like.js";

const getLikeParams = (body) => {
	return {
		name: body.name,
	};
};

export function index(req, res, next) {
	find()
		.then((likes) => {
			res.status(200).json({
				success: true,
				data: likes,
			});
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				message: `Error fetching likes: ${error.message}`,
			});
		});
}

export function create(req, res, next) {
	const likeParams = getLikeParams(req.body);
	_create(likeParams)
		.then((like) => {
			res.status(201).json({
				success: true,
				data: like,
				message: "Like created successfully",
			});
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				message: `Error saving like: ${error.message}`,
			});
		});
}

export function show(req, res, next) {
	const likeId = req.params.id;
	findById(likeId)
		.then((like) => {
			if (like) {
				res.status(200).json({
					success: true,
					data: like,
				});
			} else {
				res.status(404).json({
					success: false,
					message: "Like not found",
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				message: `Error fetching like by ID: ${error.message}`,
			});
		});
}

export function update(req, res, next) {
	const likeId = req.params.id;
	const likeParams = getLikeParams(req.body);
	_findByIdAndUpdate(likeId, { $set: likeParams }, { new: true })
		.then((like) => {
			if (like) {
				res.status(200).json({
					success: true,
					data: like,
					message: "Like updated successfully",
				});
			} else {
				res.status(404).json({
					success: false,
					message: "Like not found",
				});
			}
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				message: `Error updating like by ID: ${error.message}`,
			});
		});
}

export function deleteLike(req, res, next) {
	const likeId = req.params.id;
	findByIdAndRemove(likeId)
		.then(() => {
			res.status(200).json({
				success: true,
				message: "Like deleted successfully",
			});
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				message: `Error deleting like by ID: ${error.message}`,
			});
		});
}

// Alle Likes löschen
export function deleteLikes(req, res, next) {
	deleteMany({})
		.then(() => {
			res.status(200).json({
				success: true,
				message: "All likes deleted successfully",
			});
		})
		.catch((error) => {
			res.status(500).json({
				success: false,
				message: `Error deleting likes: ${error.message}`,
			});
		});
}

// Antwort mit JSON-Objekt
export function respondJSON(req, res) {
	res.status(OK).json({
		success: true,
		data: res.locals,
	});
}

// Fehlerbehandlung mit JSON-Antwort
export function errorJSON(error, req, res, next) {
	const errorObject = {
		status: INTERNAL_SERVER_ERROR,
		message: error ? error.message : "Unknown Error",
	};
	res.status(INTERNAL_SERVER_ERROR).json(errorObject);
}

// Benutzer-Likes filtern
export function filterUserLikes(req, res, next) {
	const currentUser = res.locals.currentUser;
	if (currentUser) {
		const mappedLikes = res.locals.likes.map((like) => {
			const userJoined = currentUser.likes.some((userLike) =>
				userLike.equals(like._id),
			);
			return Object.assign(like.toObject(), { joined: userJoined });
		});
		res.locals.likes = mappedLikes;
		next();
	} else {
		next();
	}
}

// Benutzer einem Like hinzufügen
export function join(req, res, next) {
	const likeId = req.params.id;
	const currentUser = req.user;

	if (currentUser) {
		findByIdAndUpdate(currentUser._id, {
			$addToSet: {
				likes: likeId,
			},
		})
			.then(() => {
				res.status(200).json({
					success: true,
					message: "User joined the like successfully",
				});
				next();
			})
			.catch((error) => {
				res.status(500).json({
					success: false,
					message: `Error joining like: ${error.message}`,
				});
			});
	} else {
		res.status(401).json({
			success: false,
			message: "User must log in.",
		});
	}
}
