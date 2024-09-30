import express from "express";
import * as homeController from "../controllers/homeController.js";

const router = express.Router();

router.get("/", homeController.getIndex);

router.post("/create", homeController.create);

export default router;
