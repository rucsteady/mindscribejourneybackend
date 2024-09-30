import express from "express";
import * as likesController from "../controllers/likesController.js";

const router = express.Router();

router.get("/", likesController.index);

router.post("/create", likesController.create);

router.get("/:id", likesController.show);

router.get("/:id/edit", likesController.edit);

router.put("/:id/update", likesController.update);

router.delete("/:id/delete", likesController.deleteLike);

router.post("/delete/Likes", likesController.deleteLikes);

export default router;
