import express from "express";
import * as likesController from "../controllers/likesController.js";

const router = express.Router();

router.get("/", likesController.index);
router.post("/create", likesController.create);
router.get("/:id", likesController.show);
router.put("/:id/update", likesController.update);
router.delete("/:id/delete", likesController.deleteLike);
router.post("/delete/Likes", likesController.deleteLikes);
router.post("/:id/join", likesController.join);

export default router;
