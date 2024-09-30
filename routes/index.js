import express from "express";
import userRoutes from "./userRoutes.js";
import subscriberRoutes from "./subscriberRoutes.js";
import likeRoutes from "./likeRoutes.js";
import apiRoutes from "./apiRoutes.js";
import errorRoutes from "./errorRoutes.js";
import homeRoutes from "./homeRoutes.js";

const router = express.Router();

// API-Routen verwenden
router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/likes", likeRoutes);
router.use("/api", apiRoutes);

// Home-Routen
router.use("/", homeRoutes);

// Fehler-Routen
router.use("/", errorRoutes);

export default router;
