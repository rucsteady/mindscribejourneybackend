import express from "express";
import * as subscribersController from "../controllers/subscribersController.js";

const router = express.Router();

router.get("/", subscribersController.index);

router.post("/create", subscribersController.create);

router.get("/:id", subscribersController.show);

router.get("/:id/edit", subscribersController.edit);

router.put("/:id/update", subscribersController.update);

router.delete("/:id/delete", subscribersController.deleteSubscriber);

export default router;
