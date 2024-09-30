import express from "express";
import * as usersController from "../controllers/usersController.js";

const router = express.Router();

router.get("/", usersController.index);
router.post("/create", usersController.validateUser, usersController.create);
router.post("/login", usersController.authenticate);
router.get("/logout", usersController.logout);
router.get("/:id/edit", usersController.edit);
router.put("/:id/update", usersController.update);
router.get("/:id", usersController.show);
router.delete("/:id/delete", usersController.deleteUsers);

export default router;
