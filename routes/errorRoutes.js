import express from "express";
import * as errorController from "../controllers/errorController.js";

const router = express.Router();

router.use(errorController.respondInternalError);
router.use(errorController.respondNoResourceFound);

export default router;
