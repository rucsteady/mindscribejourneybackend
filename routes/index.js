const router = require("express").Router();
import userRoutes from "./userRoutes";
import subscriberRoutes from "./subscriberRoutes";
import likeRoutes from "./likeRoutes";
import apiRoutes from "./apiRoutes";
import errorRoutes from "./errorRoutes";
import homeRoutes from "./homeRoutes";

router.use("/users", userRoutes);
router.use("/subscribers", subscriberRoutes);
router.use("/likes", likeRoutes);
router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/", errorRoutes);

export default router;
