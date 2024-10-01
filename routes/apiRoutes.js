import express from "express";
import * as likesController from "../controllers/likesController.js";

const router = express.Router();

router.get(
	"/likes",
	likesController.index,
	likesController.filterUserLikes,
	likesController.respondJSON,
);

router.get(
	"/likes/:id/join",
	likesController.join,
	likesController.respondJSON,
);

// Fehlerbehandlung als JSON-Antwort
router.use(likesController.errorJSON);

export default router;
